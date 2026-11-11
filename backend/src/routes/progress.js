import { query, withTx } from '../db.js';
import { HttpError } from '../http.js';

const KINDS = new Set(['lesson_completed', 'quiz_attempt', 'vocab_answer', 'placement_result']);
const LEVELS = new Set(['A1', 'A2', 'B1', 'B2']);
const WORD_ID = /^en-[ab][12]-w\d{3,4}$/;

async function trackExists(trackId) {
  const { rowCount } = await query('SELECT 1 FROM tracks WHERE id = $1', [trackId]);
  return rowCount > 0;
}

/** Checks one event before it is stored. Returns a normalised row or throws. */
async function validateEvent(ev) {
  if (!ev || typeof ev !== 'object') throw new HttpError(400, 'Geçersiz olay');
  if (!KINDS.has(ev.kind)) throw new HttpError(400, `Bilinmeyen olay türü: ${ev.kind}`);
  const trackId = String(ev.trackId || '');
  if (!(await trackExists(trackId))) throw new HttpError(400, `Bilinmeyen alan: ${trackId}`);
  const data = ev.data && typeof ev.data === 'object' ? ev.data : {};
  const itemId = String(ev.itemId || '');

  if (ev.kind === 'lesson_completed' || ev.kind === 'quiz_attempt') {
    const { rowCount } = await query(
      `SELECT 1 FROM modules m JOIN stages s ON s.id = m.stage_id WHERE m.id = $1 AND s.track_id = $2`,
      [itemId, trackId]
    );
    if (rowCount === 0) throw new HttpError(400, `Ders bu alanda bulunamadı: ${itemId}`);
  }
  if (ev.kind === 'quiz_attempt') {
    const score = Number(data.score), total = Number(data.total);
    if (!Number.isInteger(score) || !Number.isInteger(total) || score < 0 || total < 1 || score > total) {
      throw new HttpError(400, 'Geçersiz test sonucu');
    }
    return { trackId, kind: ev.kind, itemId, data: { score, total, passed: Boolean(data.passed) } };
  }
  if (ev.kind === 'vocab_answer') {
    if (!WORD_ID.test(itemId) || trackId !== 'english') throw new HttpError(400, 'Geçersiz kelime');
    const { rowCount } = await query('SELECT 1 FROM vocab_words WHERE id = $1', [itemId]);
    if (rowCount === 0) throw new HttpError(400, `Bilinmeyen kelime: ${itemId}`);
    return { trackId, kind: ev.kind, itemId, data: { correct: data.correct === true } };
  }
  if (ev.kind === 'placement_result') {
    const score = Number(data.score);
    if (!LEVELS.has(data.level) || !Number.isInteger(score) || score < 0 || score > 10) {
      throw new HttpError(400, 'Geçersiz seviye sonucu');
    }
    return { trackId, kind: ev.kind, itemId: '', data: { level: data.level, score, perLevel: data.perLevel || {} } };
  }
  return { trackId, kind: ev.kind, itemId, data: {} };
}

// Hours until the next review after 1, 2, 3, 4 and 5+ correct answers in a row.
const INTERVAL_HOURS = [24, 72, 168, 336, 720];
const RETRY_MINUTES = 10;

/** Leitner-style schedule: a correct answer moves the word one step further apart, a wrong one brings it back soon. */
async function updateReview(client, userId, wordId, correct) {
  const { rows: exists } = await client.query('SELECT 1 FROM vocab_words WHERE id = $1', [wordId]);
  if (exists.length === 0) return; // unknown word (e.g. an old import): nothing to schedule
  const { rows } = await client.query(
    'SELECT box FROM review_schedule WHERE user_id = $1 AND word_id = $2', [userId, wordId]
  );
  const prevBox = rows.length ? rows[0].box : 0;
  const box = correct ? Math.min(prevBox + 1, 5) : 0;
  const dueSql = correct
    ? `now() + make_interval(hours => ${INTERVAL_HOURS[Math.min(box, 5) - 1]})`
    : `now() + make_interval(mins => ${RETRY_MINUTES})`;
  await client.query(
    `INSERT INTO review_schedule (user_id, word_id, box, due_at, correct_count, wrong_count)
     VALUES ($1, $2, $3, ${dueSql}, $4, $5)
     ON CONFLICT (user_id, word_id) DO UPDATE SET
       box = EXCLUDED.box, due_at = EXCLUDED.due_at, updated_at = now(),
       correct_count = review_schedule.correct_count + EXCLUDED.correct_count,
       wrong_count = review_schedule.wrong_count + EXCLUDED.wrong_count`,
    [userId, wordId, box, correct ? 1 : 0, correct ? 0 : 1]
  );
}

export async function insertEvents(client, userId, rows) {
  for (const r of rows) {
    await client.query(
      `INSERT INTO learning_events (user_id, track_id, kind, item_id, data) VALUES ($1,$2,$3,$4,$5)`,
      [userId, r.trackId, r.kind, r.itemId, JSON.stringify(r.data)]
    );
    if (r.kind === 'vocab_answer') {
      await updateReview(client, userId, r.itemId, r.data.correct === true);
    }
  }
}

/** Builds the per-track state the client needs from the event history. */
async function buildProgress(userId) {
  const completed = await query(
    `SELECT track_id, item_id FROM learning_events
      WHERE user_id = $1 AND kind = 'lesson_completed' GROUP BY track_id, item_id ORDER BY track_id, item_id`,
    [userId]
  );
  const vocab = await query(
    `SELECT track_id, item_id FROM learning_events
      WHERE user_id = $1 AND kind = 'vocab_answer' AND data->>'correct' = 'true'
      GROUP BY track_id, item_id`,
    [userId]
  );
  const placement = await query(
    `SELECT DISTINCT ON (track_id) track_id, data, occurred_at FROM learning_events
      WHERE user_id = $1 AND kind = 'placement_result' ORDER BY track_id, occurred_at DESC`,
    [userId]
  );
  const tracks = {};
  const ensure = (id) => (tracks[id] ||= { completedModules: [], vocabKnown: [], placement: null });
  for (const r of completed.rows) ensure(r.track_id).completedModules.push(r.item_id);
  for (const r of vocab.rows) ensure(r.track_id).vocabKnown.push(r.item_id);
  for (const r of placement.rows) {
    ensure(r.track_id).placement = { ...r.data, date: r.occurred_at };
  }
  return { tracks };
}

export function registerProgressRoutes(r) {
  r.get('/api/me/progress', async ({ user }) => buildProgress(user.id));

  // Words due for review today (English). Ordered by how overdue they are.
  r.get('/api/me/reviews', async ({ user, query: qs }) => {
    const limit = Math.min(Math.max(Number(qs.get('limit')) || 10, 1), 50);
    const due = (await query(
      `SELECT COUNT(*)::int AS n FROM review_schedule WHERE user_id = $1 AND due_at <= now()`, [user.id]
    )).rows[0].n;
    const words = (await query(
      `SELECT w.id, w.en, w.tr, w.example
         FROM review_schedule r JOIN vocab_words w ON w.id = r.word_id
        WHERE r.user_id = $1 AND r.due_at <= now()
        ORDER BY r.due_at LIMIT $2`,
      [user.id, limit]
    )).rows.map(w => ({ id: w.id, en: w.en, tr: w.tr, ex: w.example }));
    return { due, words };
  });

  // Learning statistics: per track totals, due reviews, study streak and last 14 days.
  r.get('/api/me/stats', async ({ user }) => {
    const progress = await buildProgress(user.id);
    const due = (await query(
      `SELECT COUNT(*)::int AS n FROM review_schedule WHERE user_id = $1 AND due_at <= now()`, [user.id]
    )).rows[0].n;
    const days = (await query(
      `SELECT to_char(occurred_at AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS day, COUNT(*)::int AS count
         FROM learning_events WHERE user_id = $1 AND occurred_at > now() - interval '14 days'
        GROUP BY 1 ORDER BY 1`,
      [user.id]
    )).rows.map(r => ({ day: r.day, count: r.count }));
    const active = new Set(days.map(d => d.day));
    let streak = 0;
    const cursor = new Date();
    if (!active.has(cursor.toISOString().slice(0, 10))) cursor.setUTCDate(cursor.getUTCDate() - 1);
    while (active.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
    return { tracks: progress.tracks, dueReviews: due, streakDays: streak, activity: days };
  });

  r.post('/api/me/events', async ({ user, body }) => {
    const list = Array.isArray(body.events) ? body.events : [];
    if (list.length === 0 || list.length > 200) throw new HttpError(400, 'Olay sayısı 1-200 arasında olmalı');
    // A bad event is skipped on its own so the good answers in the same batch are kept.
    const rows = [];
    let rejected = 0;
    for (const ev of list) {
      try {
        rows.push(await validateEvent(ev));
      } catch (err) {
        if (!(err instanceof HttpError)) throw err;
        rejected++;
      }
    }
    if (rows.length === 0) throw new HttpError(400, 'Geçerli olay yok');
    await withTx((client) => insertEvents(client, user.id, rows));
    return { accepted: rows.length, rejected };
  });

  // One-time import of progress that was stored in the browser before accounts existed.
  r.post('/api/me/import', { bodyLimit: 2 * 1024 * 1024 }, async ({ user, body }) => {
    const { rowCount } = await query('SELECT 1 FROM progress_imports WHERE user_id = $1', [user.id]);
    if (rowCount > 0) return { imported: false, reason: 'already_imported' };

    const rows = [];
    const completed = Array.isArray(body.completedModules) ? body.completedModules.map(String) : [];
    const mods = completed.length
      ? (await query(
        `SELECT m.id, s.track_id FROM modules m JOIN stages s ON s.id = m.stage_id WHERE m.id = ANY($1)`,
        [completed]
      )).rows
      : [];
    for (const m of mods) rows.push({ trackId: m.track_id, kind: 'lesson_completed', itemId: m.id, data: { imported: true } });

    const wantedWords = (Array.isArray(body.vocabKnown) ? body.vocabKnown : []).map(String).filter(w => WORD_ID.test(w));
    const knownWords = wantedWords.length
      ? (await query('SELECT id FROM vocab_words WHERE id = ANY($1)', [wantedWords])).rows.map(r => r.id)
      : [];
    for (const w of knownWords) {
      rows.push({ trackId: 'english', kind: 'vocab_answer', itemId: w, data: { correct: true, imported: true } });
    }
    if (body.placement && LEVELS.has(body.placement.level)) {
      rows.push({
        trackId: 'english', kind: 'placement_result', itemId: '',
        data: { level: body.placement.level, score: Number(body.placement.score) || 0, perLevel: body.placement.perLevel || {}, imported: true }
      });
    }

    await withTx(async (client) => {
      await insertEvents(client, user.id, rows);
      await client.query('INSERT INTO progress_imports (user_id) VALUES ($1)', [user.id]);
    });
    return { imported: true, events: rows.length };
  });
}
