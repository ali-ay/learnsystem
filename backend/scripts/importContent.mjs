/**
 * Writes one stage's lessons from src/content/<name>.js into the database.
 *
 *   npm run content:en-a2               (= node scripts/importContent.mjs english-a2)
 *   npm run content:ai-s1 -- --dry-run
 *
 *   --dry-run   validate and print the plan without writing anything
 *
 * A content file exports:
 *   STAGE_ID   the stage the lessons belong to
 *   LESSONS    [{ id, title, duration, description, deepDive, bestPractices, questions }]
 *   STAGE      optional { trackId, name, shortName, color, folder, sortOrder } — creates or
 *              updates the stage row (used by new tracks; English stages already exist)
 *
 * Safe to run again: lessons are upserted by id and each lesson's questions are replaced.
 * Existing lesson ids keep learners' progress. Afterwards every lesson of the track is
 * renumbered in stage order.
 */
import { pool, withTx } from '../src/db.js';
import { ensureTracks } from '../src/seed.js';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const name = args.find((a) => !a.startsWith('--')) || '';
const pad = (n) => String(n).padStart(2, '0');

function validate(stageId, lessons) {
  const errors = [];
  const ids = new Set();
  const idPattern = new RegExp(`^${stageId}-\\d{2}$`);
  for (const lesson of lessons) {
    if (!idPattern.test(lesson.id)) errors.push(`${lesson.id}: id "${stageId}-NN" biçiminde olmalı`);
    if (ids.has(lesson.id)) errors.push(`${lesson.id}: tekrar eden id`);
    ids.add(lesson.id);
    if (!lesson.title || !lesson.deepDive) errors.push(`${lesson.id}: başlık veya anlatım eksik`);
    if (/<script|\son\w+=/i.test(lesson.deepDive)) errors.push(`${lesson.id}: anlatımda izin verilmeyen HTML`);
    if (lesson.questions.length < 10) errors.push(`${lesson.id}: ${lesson.questions.length} soru (en az 10)`);
    for (const [i, question] of lesson.questions.entries()) {
      const where = `${lesson.id} soru ${i + 1}`;
      if (question.options.length !== 4) errors.push(`${where}: 4 seçenek olmalı`);
      if (new Set(question.options).size !== question.options.length) errors.push(`${where}: tekrar eden seçenek`);
      if (!(question.correct >= 0 && question.correct < question.options.length)) errors.push(`${where}: doğru cevap dizini geçersiz`);
      if (!question.explanation) errors.push(`${where}: açıklama eksik`);
    }
  }
  return errors;
}

async function main() {
  if (!/^[a-z0-9-]+$/.test(name)) {
    console.error('Kullanım: node scripts/importContent.mjs <içerik-dosyası, ör. english-a2 | ai-s1> [--dry-run]');
    process.exitCode = 1;
    return;
  }
  const { STAGE_ID, LESSONS, STAGE } = await import(`../src/content/${name}.js`);

  const errors = validate(STAGE_ID, LESSONS);
  if (errors.length) {
    console.error('İçerik doğrulanamadı:\n- ' + errors.join('\n- '));
    process.exitCode = 1;
    return;
  }

  // Track rows mirror src/core/tracks.js (status, name); sync them first.
  if (!DRY_RUN) await ensureTracks();

  const stageRow = await pool.query('SELECT id, track_id FROM stages WHERE id = $1', [STAGE_ID]);
  const trackId = STAGE ? STAGE.trackId : stageRow.rows[0]?.track_id;
  if (!trackId) throw new Error(`"${STAGE_ID}" aşaması veritabanında yok ve içerik dosyası STAGE tanımlamıyor`);

  const existing = await pool.query('SELECT id FROM modules WHERE stage_id = $1', [STAGE_ID]);
  const listed = new Set(LESSONS.map((l) => l.id));
  const orphaned = existing.rows.map((r) => r.id).filter((id) => !listed.has(id));

  console.log(`${trackId} / ${STAGE_ID}${STAGE ? ` (${STAGE.name})` : ''}: ${LESSONS.length} ders, ${LESSONS.reduce((n, l) => n + l.questions.length, 0)} soru`);
  LESSONS.forEach((l, i) => console.log(`  ${pad(i + 1)}  ${l.id}  ${l.title}`));
  if (orphaned.length) {
    console.warn(`Uyarı: listede olmayan dersler silinmeyecek, aşamanın sonuna alınacak: ${orphaned.join(', ')}`);
  }
  if (DRY_RUN) {
    console.log('Deneme modu: veritabanına yazılmadı.');
    return;
  }

  await withTx(async (client) => {
    if (STAGE) {
      await client.query(
        `INSERT INTO stages (id, track_id, name, short_name, color, folder, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO UPDATE SET track_id = EXCLUDED.track_id, name = EXCLUDED.name,
           short_name = EXCLUDED.short_name, color = EXCLUDED.color, folder = EXCLUDED.folder,
           sort_order = EXCLUDED.sort_order`,
        [STAGE_ID, STAGE.trackId, STAGE.name, STAGE.shortName, STAGE.color, STAGE.folder || STAGE_ID, STAGE.sortOrder]
      );
    }

    for (const lesson of LESSONS) {
      await client.query(
        `INSERT INTO modules (id, stage_id, number, title, duration, description, deep_dive,
           analogy_title, analogy_text, antigravity_code, best_practices, sort_order, updated_at)
         VALUES ($1, $2, '', $3, $4, $5, $6, '', '', '', $7, 0, now())
         ON CONFLICT (id) DO UPDATE SET stage_id = EXCLUDED.stage_id, title = EXCLUDED.title,
           duration = EXCLUDED.duration, description = EXCLUDED.description,
           deep_dive = EXCLUDED.deep_dive, best_practices = EXCLUDED.best_practices, updated_at = now()`,
        [lesson.id, STAGE_ID, lesson.title, lesson.duration, lesson.description,
          lesson.deepDive, JSON.stringify(lesson.bestPractices)]
      );

      await client.query('DELETE FROM questions WHERE module_id = $1', [lesson.id]);
      for (const [j, question] of lesson.questions.entries()) {
        await client.query(
          `INSERT INTO questions (id, module_id, category, type, question, code, options, correct_index,
             explanation, engine_behavior, best_practice, sort_order)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, '', $10, $11)`,
          [`${lesson.id}-q${pad(j + 1)}`, lesson.id, question.category, question.code ? 'code' : 'conceptual',
            question.question, question.code || '', JSON.stringify(question.options), question.correct,
            question.explanation, question.tip || '', j]
        );
      }
    }

    // Renumber the whole track: stages in order; inside the imported stage the file's
    // order, then any unlisted lessons; other stages keep their current order.
    const all = await client.query(
      `SELECT m.id, m.stage_id, m.sort_order, s.sort_order AS stage_order
         FROM modules m JOIN stages s ON s.id = m.stage_id
        WHERE s.track_id = $1`,
      [trackId]
    );
    const position = new Map(LESSONS.map((l, i) => [l.id, i]));
    const rank = (row) => (row.stage_id === STAGE_ID
      ? (position.has(row.id) ? position.get(row.id) : LESSONS.length + row.sort_order)
      : row.sort_order);
    const ordered = all.rows.sort((a, b) => (a.stage_order - b.stage_order) || (rank(a) - rank(b)));
    for (const [i, row] of ordered.entries()) {
      await client.query('UPDATE modules SET number = $2, sort_order = $3 WHERE id = $1', [row.id, pad(i + 1), i]);
    }
  });

  console.log(`Tamamlandı: dersler yazıldı ve "${trackId}" alanının dersleri yeniden numaralandı.`);
}

main()
  .catch((err) => { console.error(err.message); process.exitCode = 1; })
  .finally(() => pool.end());
