/**
 * Server-side quizzes. The server builds each test, shuffles questions and options,
 * keeps the answer key, grades every answer and records the result. The browser only
 * ever sees opaque option tokens; the correct token is revealed after an answer.
 */
import crypto from 'crypto';
import { query, withTx } from '../db.js';
import { HttpError } from '../http.js';
import { insertEvents } from './progress.js';

const SESSION_TTL_MS = 3 * 60 * 60 * 1000;
const PASS_PERCENT = 80;
const VOCAB_SIZE = 10;
const LEVEL_ID = /^[A-Za-z0-9_-]{1,64}$/;

/** In-memory sessions. Lost on restart; a learner simply starts the test again. */
const sessions = new Map();

function prune() {
  const now = Date.now();
  for (const [id, s] of sessions) {
    if (now - s.createdAt > SESSION_TTL_MS) sessions.delete(id);
  }
}

const newToken = () => crypto.randomBytes(12).toString('base64url');

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getSession(sessionId, userId) {
  const s = sessions.get(String(sessionId || ''));
  if (!s || s.userId !== userId || Date.now() - s.createdAt > SESSION_TTL_MS) {
    throw new HttpError(404, 'Oturum bulunamadı veya süresi doldu');
  }
  return s;
}

/**
 * One question with its options in a fresh random order. Every option gets a random token;
 * only the token of the correct option is marked, and it never leaves the server before the answer.
 */
function choiceItem({ qid, meta, options, correctIndex, reveal = {}, wordId = null, level = null }) {
  if (!Array.isArray(options) || options.length < 2 || correctIndex < 0 || correctIndex >= options.length) {
    throw new HttpError(500, `Soru ${qid} geçersiz`);
  }
  const order = shuffle(options.map((_, i) => i));
  const tokens = order.map(() => newToken());
  const correctToken = tokens[order.indexOf(correctIndex)];
  return {
    qid,
    wordId,
    level,
    correctToken,
    tokens: new Set(tokens),
    reveal,
    answer: null,
    correct: null,
    public: {
      id: qid,
      ...meta,
      options: order.map((orig, slot) => ({ token: tokens[slot], text: options[orig] }))
    }
  };
}

function createSession(userId, { kind, mode, ref = null, trackId, items }) {
  const id = crypto.randomBytes(18).toString('base64url');
  const questions = new Map(items.map(item => [item.qid, item]));
  sessions.set(id, { id, userId, kind, mode, ref, trackId, createdAt: Date.now(), questions, finished: false, result: null });
  return { sessionId: id, kind, mode, questions: items.map(item => item.public) };
}

async function levelRows() {
  return (await query(
    'SELECT level, label, stage_id, summary, min_score FROM placement_levels ORDER BY min_score DESC'
  )).rows;
}

export function registerQuizRoutes(r) {
  r.post('/api/quiz/start', async ({ user, body }) => {
    prune();
    const kind = String(body.kind || '');
    const ref = body.ref == null ? null : String(body.ref);

    if (kind === 'module') {
      if (!ref || !LEVEL_ID.test(ref)) throw new HttpError(400, 'Ders gerekli');
      const mod = (await query(
        'SELECT m.id, s.track_id FROM modules m JOIN stages s ON s.id = m.stage_id WHERE m.id = $1', [ref]
      )).rows[0];
      if (!mod) throw new HttpError(404, 'Ders bulunamadı');
      const rows = (await query('SELECT * FROM questions WHERE module_id = $1 ORDER BY sort_order', [ref])).rows;
      const items = rows.map(row => choiceItem({
        qid: row.id,
        meta: { category: row.category, type: row.type, question: row.question, code: row.code },
        options: row.options,
        correctIndex: row.correct_index,
        reveal: { explanation: row.explanation, engineBehavior: row.engine_behavior, bestPractice: row.best_practice }
      }));
      return createSession(user.id, { kind, mode: 'practice', ref, trackId: mod.track_id, items: shuffle(items) });
    }

    if (kind === 'bank') {
      if (!['beginner', 'intermediate', 'advanced'].includes(ref)) throw new HttpError(400, 'Geçersiz seviye');
      const rows = (await query(
        `SELECT * FROM quiz_bank_questions WHERE track_id = 'js' AND level = $1 ORDER BY sort_order`, [ref]
      )).rows;
      const items = rows.map(row => choiceItem({
        qid: row.id,
        meta: { category: row.category, type: row.type, question: row.question, code: row.code },
        options: row.options,
        correctIndex: row.correct_index,
        reveal: { explanation: row.explanation, engineBehavior: row.engine_behavior, bestPractice: row.best_practice }
      }));
      return createSession(user.id, { kind, mode: 'practice', ref, trackId: 'js', items: shuffle(items) });
    }

    if (kind === 'placement') {
      const rows = (await query('SELECT * FROM placement_questions ORDER BY sort_order')).rows;
      const items = rows.map(row => choiceItem({
        qid: row.id,
        meta: { question: row.question, level: row.level },
        options: row.options,
        correctIndex: row.correct_index,
        level: row.level
      }));
      // Placement never reveals answers while the test runs.
      return createSession(user.id, { kind, mode: 'test', trackId: 'english', items: shuffle(items) });
    }

    if (kind === 'vocab') {
      if (!ref || !LEVEL_ID.test(ref)) throw new HttpError(400, 'Aşama gerekli');
      const stage = (await query(`SELECT id FROM stages WHERE id = $1 AND track_id = 'english'`, [ref])).rows[0];
      if (!stage) throw new HttpError(404, 'Aşama bulunamadı');
      const words = (await query(
        'SELECT id, en, tr, example FROM vocab_words WHERE stage_id = $1 ORDER BY sort_order', [ref]
      )).rows;
      const known = new Set((await query(
        `SELECT DISTINCT item_id FROM learning_events
          WHERE user_id = $1 AND kind = 'vocab_answer' AND data->>'correct' = 'true' AND item_id LIKE $2`,
        [user.id, `${ref}-w%`]
      )).rows.map(r => r.item_id));
      // Unknown words first; known ones only fill the session when there are not enough new words.
      const unknown = shuffle(words.filter(w => !known.has(w.id)));
      const pool = unknown.length >= VOCAB_SIZE
        ? unknown
        : [...unknown, ...shuffle(words.filter(w => known.has(w.id)))];
      const items = pool.slice(0, VOCAB_SIZE).map(w => wordItem(w, words));
      return createSession(user.id, { kind, mode: 'practice', ref, trackId: 'english', items });
    }

    if (kind === 'review') {
      const due = (await query(
        `SELECT w.id, w.en, w.tr, w.example, w.stage_id FROM review_schedule r
           JOIN vocab_words w ON w.id = r.word_id
          WHERE r.user_id = $1 AND r.due_at <= now()
          ORDER BY r.due_at LIMIT $2`,
        [user.id, VOCAB_SIZE]
      )).rows;
      const pools = new Map();
      for (const w of due) {
        if (!pools.has(w.stage_id)) {
          pools.set(w.stage_id, (await query('SELECT id, en, tr, example FROM vocab_words WHERE stage_id = $1', [w.stage_id])).rows);
        }
      }
      const items = shuffle(due).map(w => wordItem(w, pools.get(w.stage_id)));
      return createSession(user.id, { kind, mode: 'practice', trackId: 'english', items });
    }

    throw new HttpError(400, 'Geçersiz test türü');
  });

  r.post('/api/quiz/answer', async ({ user, body }) => {
    const s = getSession(body.sessionId, user.id);
    if (s.finished) throw new HttpError(409, 'Bu test bitti');
    const q = s.questions.get(String(body.questionId || ''));
    if (!q) throw new HttpError(400, 'Bu soru bu testte değil');

    if (q.answer === null) {
      const token = String(body.token || '');
      if (!q.tokens.has(token)) throw new HttpError(400, 'Geçersiz şık');
      q.answer = token;
      q.correct = token === q.correctToken;
      if (q.wordId) {
        // Vocabulary answers update the learner's record and review schedule right away.
        await withTx(client => insertEvents(client, user.id, [{
          trackId: 'english', kind: 'vocab_answer', itemId: q.wordId, data: { correct: q.correct }
        }]));
      }
    }
    if (s.mode === 'test') return { recorded: true };
    return { correct: q.correct, correctToken: q.correctToken, ...q.reveal };
  });

  r.post('/api/quiz/finish', async ({ user, body }) => {
    const s = getSession(body.sessionId, user.id);
    if (s.finished) return s.result;
    const all = [...s.questions.values()];
    const total = all.length;
    const correct = all.filter(q => q.correct === true).length;
    s.finished = true;

    if (s.kind === 'module') {
      const percentage = total ? Math.round((correct / total) * 100) : 0;
      const passed = percentage >= PASS_PERCENT;
      await withTx(async (client) => {
        await insertEvents(client, user.id, [{
          trackId: s.trackId, kind: 'quiz_attempt', itemId: s.ref, data: { score: correct, total, passed }
        }]);
        if (passed) {
          await insertEvents(client, user.id, [{ trackId: s.trackId, kind: 'lesson_completed', itemId: s.ref, data: {} }]);
        }
      });
      s.result = { correct, total, percentage, passed };
    } else if (s.kind === 'placement') {
      const perLevel = {};
      for (const q of all) {
        perLevel[q.public.level] ||= [0, 0];
        perLevel[q.public.level][1]++;
        if (q.correct) perLevel[q.public.level][0]++;
      }
      const levels = await levelRows();
      const info = levels.find(l => correct >= l.min_score) || levels[levels.length - 1];
      await withTx(client => insertEvents(client, user.id, [{
        trackId: 'english', kind: 'placement_result', itemId: '', data: { level: info.level, score: correct, perLevel }
      }]));
      s.result = {
        level: info.level, score: correct, total, perLevel,
        label: info.label, summary: info.summary, stageId: info.stage_id
      };
    } else {
      s.result = { correct, total };
    }
    return s.result;
  });
}

/** Vocabulary question: the English word, four Turkish meanings. */
function wordItem(word, stageWords) {
  const distractors = shuffle(stageWords.filter(w => w.id !== word.id)).slice(0, 3).map(w => w.tr);
  return choiceItem({
    qid: word.id,
    wordId: word.id,
    meta: { question: word.en, example: word.example },
    options: [word.tr, ...distractors],
    correctIndex: 0,
    reveal: { explanation: `${word.en} = ${word.tr}` }
  });
}
