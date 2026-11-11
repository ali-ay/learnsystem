import { query, withTx } from '../db.js';
import { HttpError, readJson } from '../http.js';
import { config } from '../config.js';

const MODULE_ID = /^[a-zA-Z0-9_-]{1,64}$/;
const quizOut = (q) => ({
  id: q.id,
  category: q.category,
  type: q.type,
  question: q.question,
  code: q.code,
  options: q.options,
  correctIndex: q.correct_index,
  explanation: q.explanation,
  engineBehavior: q.engine_behavior,
  bestPractice: q.best_practice
});

function publicQuizOut(row) {
  return { id: row.id, category: row.category, type: row.type, question: row.question, code: row.code, options: row.options };
}

async function writeQuiz(client, moduleId, quiz) {
  await client.query('DELETE FROM questions WHERE module_id = $1', [moduleId]);
  for (const [i, q] of quiz.entries()) {
    await client.query(
      `INSERT INTO questions (id, module_id, category, type, question, code, options, correct_index,
         explanation, engine_behavior, best_practice, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        q.id || `${moduleId}-q${String(i + 1).padStart(2, '0')}`, moduleId, q.category || '',
        q.type || 'conceptual', q.question || '', q.code || '', JSON.stringify(q.options || []),
        typeof q.correctIndex === 'number' ? q.correctIndex : 0, q.explanation || '',
        q.engineBehavior || '', q.bestPractice || '', i
      ]
    );
  }
}

export function registerCurriculumRoutes(r) {
  r.get('/api/stages', async ({ query: qs }) => {
    const { rows } = await query(
      `SELECT s.id, s.track_id, s.name, s.short_name, s.color, s.folder, s.sort_order, s.vocab_target,
              (SELECT COUNT(*) FROM vocab_words w WHERE w.stage_id = s.id)::int AS vocab_count,
              (SELECT COUNT(*) FROM modules m WHERE m.stage_id = s.id)::int AS modules_count,
              (SELECT COUNT(*) FROM questions q JOIN modules m ON m.id = q.module_id
                WHERE m.stage_id = s.id)::int AS questions_count
         FROM stages s
        WHERE ($1::text IS NULL OR s.track_id = $1)
        ORDER BY s.sort_order`,
      [qs.get('track')]
    );
    return rows;
  });

  r.get('/api/modules', async ({ query: qs }) => {
    const { rows } = await query(
      `SELECT m.id, m.stage_id, m.number, m.title, m.duration, m.description, m.sort_order, m.updated_at,
              (SELECT COUNT(*) FROM questions q WHERE q.module_id = m.id)::int AS question_count
         FROM modules m
         JOIN stages s ON s.id = m.stage_id
        WHERE ($1::text IS NULL OR m.stage_id = $1)
          AND ($2::text IS NULL OR s.track_id = $2)
          AND ($3::text IS NULL OR m.title ILIKE '%' || $3 || '%' OR m.description ILIKE '%' || $3 || '%')
        ORDER BY s.sort_order, m.sort_order`,
      [qs.get('stageId') || null, qs.get('track') || null, qs.get('q') || null]
    );
    return rows;
  });

  r.get('/api/modules/:id', async ({ params, user }) => {
    const { rows } = await query('SELECT * FROM modules WHERE id = $1', [params.id]);
    const m = rows[0];
    if (!m) throw new HttpError(404, `Module ${params.id} not found`);
    const q = await query('SELECT * FROM questions WHERE module_id = $1 ORDER BY sort_order', [m.id]);
    return {
      metadata: {
        id: m.id, stageId: m.stage_id, number: m.number, title: m.title, duration: m.duration,
        description: m.description, updatedAt: m.updated_at
      },
      content: {
        deepDive: m.deep_dive,
        analogy: { title: m.analogy_title, text: m.analogy_text },
        antigravityCode: m.antigravity_code,
        bestPractices: m.best_practices,
        // Answer keys are only shown to administrators; learners get them from /api/quiz/answer.
        quiz: q.rows.map(row => (user.role === 'admin' ? quizOut(row) : publicQuizOut(row)))
      }
    };
  });

  r.put('/api/modules/:id', { admin: true }, async ({ params, body }) => {
    const { metadata = {}, content = {} } = body;
    const { rows } = await query('SELECT id FROM modules WHERE id = $1', [params.id]);
    if (rows.length === 0) throw new HttpError(404, `Module ${params.id} not found`);
    await withTx(async (client) => {
      await client.query(
        `UPDATE modules SET title = COALESCE($2, title), duration = COALESCE($3, duration),
            description = COALESCE($4, description), deep_dive = $5, analogy_title = $6,
            analogy_text = $7, antigravity_code = $8, best_practices = $9, updated_at = now()
          WHERE id = $1`,
        [
          params.id, metadata.title || null, metadata.duration || null, metadata.description || null,
          content.deepDive || '', (content.analogy && content.analogy.title) || '',
          (content.analogy && content.analogy.text) || '', content.antigravityCode || '',
          JSON.stringify(content.bestPractices || [])
        ]
      );
      if (Array.isArray(content.quiz)) await writeQuiz(client, params.id, content.quiz);
    });
    return { success: true, message: `Module ${params.id} updated successfully.` };
  });

  r.post('/api/modules', { admin: true }, async ({ body }) => {
    const { metadata = {}, content = {} } = body;
    if (!metadata.id || !metadata.title || !metadata.stageId) {
      throw new HttpError(400, 'Missing required fields: id, title, stageId');
    }
    if (!MODULE_ID.test(String(metadata.id))) {
      throw new HttpError(400, 'Module id may only contain letters, digits, "_" and "-" (max 64)');
    }
    const stage = await query('SELECT id FROM stages WHERE id = $1', [metadata.stageId]);
    if (stage.rows.length === 0) throw new HttpError(404, `Unknown stageId: ${metadata.stageId}`);
    const exists = await query('SELECT 1 FROM modules WHERE id = $1', [metadata.id]);
    if (exists.rows.length) throw new HttpError(409, `Module with ID ${metadata.id} already exists`);

    await withTx(async (client) => {
      const max = await client.query('SELECT COALESCE(MAX(sort_order), 0) + 1 AS n FROM modules WHERE stage_id = $1', [metadata.stageId]);
      await client.query(
        `INSERT INTO modules (id, stage_id, number, title, duration, description, deep_dive,
           analogy_title, analogy_text, antigravity_code, best_practices, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        [
          metadata.id, metadata.stageId, metadata.number || '00', metadata.title, metadata.duration || '20 dk',
          metadata.description || '', content.deepDive || '', (content.analogy && content.analogy.title) || '',
          (content.analogy && content.analogy.text) || '', content.antigravityCode || '',
          JSON.stringify(content.bestPractices || []), max.rows[0].n
        ]
      );
      if (Array.isArray(content.quiz)) await writeQuiz(client, metadata.id, content.quiz);
    });
    return { status: 201, body: { success: true, id: metadata.id } };
  });

  r.delete('/api/modules/:id', { admin: true }, async ({ params }) => {
    const { rowCount } = await query('DELETE FROM modules WHERE id = $1', [params.id]);
    if (rowCount === 0) throw new HttpError(404, `Module ${params.id} not found`);
    return { success: true, message: `Module ${params.id} deleted` };
  });

  r.get('/api/export', { admin: true }, async () => {
    const stages = (await query('SELECT * FROM stages ORDER BY sort_order')).rows;
    const modules = (await query('SELECT * FROM modules ORDER BY sort_order')).rows;
    const questions = (await query('SELECT * FROM questions ORDER BY module_id, sort_order')).rows;
    return { version: '2.0.0', exportedAt: new Date().toISOString(), stages, modules, questions };
  });

  r.post('/api/import', { admin: true, bodyLimit: config.importBodyLimitBytes }, async ({ body }) => {
    if (!Array.isArray(body.modules) || !Array.isArray(body.stages)) {
      throw new HttpError(400, 'Invalid backup file format');
    }
    await withTx(async (client) => {
      await client.query('DELETE FROM stages WHERE track_id = ANY($1)', [[...new Set(body.stages.map(s => s.track_id || 'js'))]]);
      for (const s of body.stages) {
        await client.query(
          `INSERT INTO stages (id, track_id, name, short_name, color, folder, sort_order)
           VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name`,
          [s.id, s.track_id || 'js', s.name, s.short_name, s.color || '', s.folder || '', s.sort_order || 0]
        );
      }
      for (const m of body.modules) {
        await client.query(
          `INSERT INTO modules (id, stage_id, number, title, duration, description, deep_dive, analogy_title,
             analogy_text, antigravity_code, best_practices, sort_order, updated_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
           ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, deep_dive = EXCLUDED.deep_dive`,
          [m.id, m.stage_id, m.number, m.title, m.duration || '20 dk', m.description || '', m.deep_dive || '',
            m.analogy_title || '', m.analogy_text || '', m.antigravity_code || '',
            typeof m.best_practices === 'string' ? m.best_practices : JSON.stringify(m.best_practices || []),
            m.sort_order || 0, m.updated_at || new Date().toISOString()]
        );
      }
      for (const q of body.questions || []) {
        await client.query(
          `INSERT INTO questions (id, module_id, category, type, question, code, options, correct_index,
             explanation, engine_behavior, best_practice, sort_order)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
           ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question`,
          [q.id, q.module_id, q.category || '', q.type || 'conceptual', q.question, q.code || '',
            typeof q.options === 'string' ? q.options : JSON.stringify(q.options || []),
            q.correct_index || 0, q.explanation || '', q.engine_behavior || '', q.best_practice || '', q.sort_order || 0]
        );
      }
    });
    return { success: true, message: 'Data imported successfully' };
  });
}
