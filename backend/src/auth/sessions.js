import crypto from 'crypto';
import { query } from '../db.js';
import { config } from '../config.js';

export const SESSION_COOKIE = 'sid';

const hash = (token) => crypto.createHash('sha256').update(token).digest('hex');

/** Creates a session and returns the raw token (only the hash is stored). */
export async function createSession(userId) {
  const token = crypto.randomBytes(32).toString('base64url');
  await query(
    `INSERT INTO sessions (token_hash, user_id, expires_at)
     VALUES ($1, $2, now() + make_interval(days => $3))`,
    [hash(token), userId, config.sessionDays]
  );
  return token;
}

/** Returns { user, sessionHash } for a valid, unexpired session token. */
export async function findSession(token) {
  if (!token) return null;
  const tokenHash = hash(token);
  const { rows } = await query(
    `SELECT u.id, u.email, u.display_name, u.role, u.status
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = $1 AND s.expires_at > now()`,
    [tokenHash]
  );
  if (rows.length === 0) return null;
  return { user: rows[0], tokenHash };
}

export async function destroySession(token) {
  if (!token) return;
  await query('DELETE FROM sessions WHERE token_hash = $1', [hash(token)]);
}
