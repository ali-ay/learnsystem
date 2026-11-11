/**
 * API server: `npm run dev` (backend/). Serves /api/* only; the frontend is served by Vite (dev)
 * or by a static host (production) and talks to this server through /api.
 */
import http from 'http';
import { config } from './config.js';
import { pool, query } from './db.js';
import { migrate } from './migrate.js';
import { createRouter, send, readJson, checkOrigin, HttpError, parseCookies, UNSAFE_METHODS } from './http.js';
import { findSession, SESSION_COOKIE } from './auth/sessions.js';
import { registerAuthRoutes } from './routes/auth.js';
import { registerAdminRoutes } from './routes/admin.js';
import { registerCurriculumRoutes } from './routes/curriculum.js';
import { registerProgressRoutes } from './routes/progress.js';
import { registerContentRoutes } from './routes/content.js';
import { registerQuizRoutes } from './routes/quiz.js';
import { ensureTracks } from './seed.js';

export async function bootstrap() {
  await migrate();
  await ensureTracks();
}

const router = createRouter();
registerAuthRoutes(router);
registerAdminRoutes(router);
registerCurriculumRoutes(router);
registerProgressRoutes(router);
registerContentRoutes(router);
registerQuizRoutes(router);

async function handle(req, res) {
  const url = new URL(req.url, 'http://localhost');
  if (!url.pathname.startsWith('/api/')) return send(res, 404, { error: 'Bulunamadı' });

  const found = router.match(req.method, url.pathname);
  if (!found) return send(res, 404, { error: 'API yolu bulunamadı' });
  const { route, params } = found;

  checkOrigin(req);

  let user = null;
  if (!route.options.public) {
    const session = await findSession(parseCookies(req.headers.cookie)[SESSION_COOKIE]);
    if (!session) throw new HttpError(401, 'Giriş gerekli', 'unauthenticated');
    if (session.user.status !== 'approved') throw new HttpError(403, 'Hesabınız onaylanmadı', 'not_approved');
    user = session.user;
  }
  if (route.options.admin && user.role !== 'admin') throw new HttpError(403, 'Bu işlem için yönetici yetkisi gerekir');

  const body = UNSAFE_METHODS.has(req.method)
    ? await readJson(req, route.options.bodyLimit || config.bodyLimitBytes)
    : {};
  const ctx = { req, res, params, query: url.searchParams, body, user };
  const result = await route.handler(ctx);
  if (result === undefined) {
    res.statusCode = 204;
    return res.end();
  }
  if (result && result.status && result.body !== undefined) return send(res, result.status, result.body);
  return send(res, 200, result);
}

const server = http.createServer(async (req, res) => {
  try {
    await handle(req, res);
  } catch (err) {
    if (err instanceof HttpError) {
      return send(res, err.status, { error: err.message, code: err.code });
    }
    console.error('[api]', req.method, req.url, err);
    send(res, 500, { error: 'Sunucu hatası' });
  }
});

if (process.argv[1] && process.argv[1].endsWith('index.js') && process.env.NO_LISTEN !== '1') {
  bootstrap()
    .then(() => server.listen(config.apiPort, () => console.log(`[api] http://localhost:${config.apiPort}`)))
    .catch((err) => {
      console.error('[api] startup failed', err);
      process.exit(1);
    });
  const shutdown = async () => { server.close(); await pool.end(); process.exit(0); };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

export { server };
