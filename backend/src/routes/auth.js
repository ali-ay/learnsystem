import { query } from '../db.js';
import { HttpError, setCookie, parseCookies } from '../http.js';
import { hashPassword, verifyPassword } from '../auth/passwords.js';
import { createSession, findSession, destroySession, SESSION_COOKIE } from '../auth/sessions.js';
import { config } from '../config.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanEmail(value) {
  return String(value || '').trim().toLowerCase().slice(0, 254);
}

export function registerAuthRoutes(r) {
  // Self-service sign-up creates a pending account; an admin must approve it.
  r.post('/api/auth/register', { public: true }, async ({ body }) => {
    const email = cleanEmail(body.email);
    const password = String(body.password || '');
    const displayName = String(body.displayName || '').trim().slice(0, 80);
    if (!EMAIL_RE.test(email)) throw new HttpError(400, 'Geçerli bir e-posta girin');
    if (password.length < 10 || password.length > 200) {
      throw new HttpError(400, 'Şifre en az 10 karakter olmalı');
    }
    const hash = await hashPassword(password);
    await query(
      `INSERT INTO users (email, display_name, password_hash)
       VALUES ($1, $2, $3)
       ON CONFLICT ((lower(email))) DO NOTHING`,
      [email, displayName, hash]
    );
    // Same answer whether or not the e-mail already exists.
    return {
      status: 202,
      body: { status: 'pending', message: 'Başvurunuz alındı. Yönetici onayladıktan sonra giriş yapabilirsiniz.' }
    };
  });

  r.post('/api/auth/login', { public: true }, async ({ body, res }) => {
    const email = cleanEmail(body.email);
    const password = String(body.password || '');
    const { rows } = await query(
      `SELECT id, email, display_name, password_hash, role, status FROM users WHERE lower(email) = $1`,
      [email]
    );
    const user = rows[0];
    const ok = user ? await verifyPassword(password, user.password_hash) : false;
    if (!ok) throw new HttpError(401, 'E-posta veya şifre hatalı', 'bad_credentials');
    if (user.status === 'pending') {
      throw new HttpError(403, 'Hesabınız henüz onaylanmadı', 'pending');
    }
    if (user.status !== 'approved') {
      throw new HttpError(403, 'Bu hesap kullanıma kapalı', 'rejected');
    }
    const token = await createSession(user.id);
    setCookie(res, SESSION_COOKIE, token, { maxAgeSeconds: config.sessionDays * 86400 });
    return publicUser(user);
  });

  r.post('/api/auth/logout', { public: true }, async ({ req, res }) => {
    const token = parseCookies(req.headers.cookie)[SESSION_COOKIE];
    await destroySession(token);
    setCookie(res, SESSION_COOKIE, '', { maxAgeSeconds: 0 });
    return undefined;
  });

  r.get('/api/auth/me', { public: true }, async ({ req }) => {
    const session = await findSession(parseCookies(req.headers.cookie)[SESSION_COOKIE]);
    if (!session || session.user.status !== 'approved') {
      throw new HttpError(401, 'Giriş gerekli', 'unauthenticated');
    }
    return publicUser(session.user);
  });
}

export function publicUser(u) {
  return { id: Number(u.id), email: u.email, displayName: u.display_name, role: u.role, status: u.status };
}
