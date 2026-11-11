/** Track rows come from tracks.js; content itself lives in the database. */
import { query } from './db.js';
import { TRACKS } from './tracks.js';

export async function ensureTracks() {
  for (const [i, t] of TRACKS.entries()) {
    await query(
      `INSERT INTO tracks (id, name, icon, description, status, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon,
         description = EXCLUDED.description, status = EXCLUDED.status, sort_order = EXCLUDED.sort_order`,
      [t.id, t.name, t.icon, t.description, t.status, i]
    );
  }
}
