/**
 * Runtime configuration. Everything sensitive comes from environment variables;
 * the defaults only work on the developer machine.
 */
export const config = {
  databaseUrl: process.env.DATABASE_URL || 'postgres://aliay@localhost:5432/linear_app',
  apiPort: Number(process.env.API_PORT || 3001),
  sessionDays: Number(process.env.SESSION_DAYS || 14),
  cookieSecure: process.env.COOKIE_SECURE === 'true',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000')
    .split(',').map(s => s.trim()).filter(Boolean),
  bodyLimitBytes: 1 * 1024 * 1024,
  importBodyLimitBytes: 8 * 1024 * 1024
};
