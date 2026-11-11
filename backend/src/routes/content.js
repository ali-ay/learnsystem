import { query } from '../db.js';

export function registerContentRoutes(r) {
  // Placement levels (labels and score thresholds). The questions are only served by /api/quiz/start.
  r.get('/api/placement', async () => {
    const levels = (await query(
      `SELECT level, label, stage_id, summary, min_score FROM placement_levels ORDER BY sort_order`
    )).rows.map(l => ({ level: l.level, label: l.label, stageId: l.stage_id, summary: l.summary, minScore: l.min_score }));
    return { levels, questions: [] };
  });
}
