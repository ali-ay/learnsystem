import { query } from '../db.js';
import { HttpError } from '../http.js';
import { publicUser } from './auth.js';

const VALID_STATUS = new Set(['pending', 'approved', 'rejected', 'disabled']);

async function setStatus(ctx, status) {
  const id = Number(ctx.params.id);
  if (!Number.isInteger(id)) throw new HttpError(400, 'Geçersiz kullanıcı');
  if (id === Number(ctx.user.id) && status !== 'approved') {
    throw new HttpError(400, 'Kendi hesabınızı kapatamazsınız');
  }
  const { rows } = await query(
    `UPDATE users SET status = $2,
            approved_at = CASE WHEN $2 = 'approved' THEN now() ELSE approved_at END,
            approved_by = CASE WHEN $2 = 'approved' THEN $3 ELSE approved_by END
      WHERE id = $1
      RETURNING id, email, display_name, role, status`,
    [id, status, ctx.user.id]
  );
  if (rows.length === 0) throw new HttpError(404, 'Kullanıcı bulunamadı');
  return publicUser(rows[0]);
}

export function registerAdminRoutes(r) {
  r.get('/api/admin/users', { admin: true }, async ({ query: qs }) => {
    const status = qs.get('status');
    if (status && !VALID_STATUS.has(status)) throw new HttpError(400, 'Geçersiz durum');
    const { rows } = await query(
      `SELECT id, email, display_name, role, status, created_at, approved_at
         FROM users
        WHERE ($1::text IS NULL OR status = $1)
        ORDER BY created_at DESC
        LIMIT 500`,
      [status || null]
    );
    return rows.map(r => ({ ...publicUser(r), createdAt: r.created_at, approvedAt: r.approved_at }));
  });

  r.post('/api/admin/users/:id/approve', { admin: true }, (ctx) => setStatus(ctx, 'approved'));
  r.post('/api/admin/users/:id/reject', { admin: true }, (ctx) => setStatus(ctx, 'rejected'));
  r.post('/api/admin/users/:id/disable', { admin: true }, (ctx) => setStatus(ctx, 'disabled'));
}
