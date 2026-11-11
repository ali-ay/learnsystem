/**
 * Minimal HTTP layer: routing with path params, JSON bodies with size limits,
 * cookies, and origin checks for state-changing requests.
 */
import { config } from './config.js';

export class HttpError extends Error {
  constructor(status, message, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function send(res, status, body) {
  const payload = body === undefined ? '' : JSON.stringify(body);
  res.statusCode = status;
  if (payload) res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(payload);
}

export function readJson(req, limit) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new HttpError(413, 'İstek gövdesi çok büyük'));
        req.resume();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (size > limit) return;
      const text = Buffer.concat(chunks).toString('utf8');
      if (!text) return resolve({});
      try {
        resolve(JSON.parse(text));
      } catch {
        reject(new HttpError(400, 'Geçersiz JSON'));
      }
    });
    req.on('error', reject);
  });
}

export function parseCookies(header = '') {
  const out = {};
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

export function setCookie(res, name, value, { maxAgeSeconds }) {
  const parts = [`${name}=${encodeURIComponent(value)}`, 'Path=/', 'HttpOnly', 'SameSite=Lax'];
  if (maxAgeSeconds !== undefined) parts.push(`Max-Age=${maxAgeSeconds}`);
  if (config.cookieSecure) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}

/** Compiles "/api/modules/:id" into a regex and keeps the parameter names. */
function compile(pattern) {
  const keys = [];
  const source = pattern.replace(/:([A-Za-z_]+)/g, (_, key) => {
    keys.push(key);
    return '([^/]+)';
  });
  return { re: new RegExp(`^${source}$`), keys };
}

export function createRouter() {
  const routes = [];
  const add = (method) => (pattern, options, handler) => {
    if (typeof options === 'function') {
      handler = options;
      options = {};
    }
    routes.push({ method, ...compile(pattern), options, handler });
  };

  return {
    get: add('GET'),
    post: add('POST'),
    put: add('PUT'),
    delete: add('DELETE'),

    /** Finds a route for the request, or returns null. */
    match(method, pathname) {
      for (const route of routes) {
        if (route.method !== method) continue;
        const m = route.re.exec(pathname);
        if (!m) continue;
        const params = {};
        route.keys.forEach((k, i) => { params[k] = decodeURIComponent(m[i + 1]); });
        return { route, params };
      }
      return null;
    }
  };
}

export const UNSAFE_METHODS = new Set(['POST', 'PUT', 'DELETE', 'PATCH']);

/** Rejects state-changing requests from origins other than the app. */
export function checkOrigin(req) {
  if (!UNSAFE_METHODS.has(req.method)) return;
  const origin = req.headers.origin;
  if (origin && !config.allowedOrigins.includes(origin)) {
    throw new HttpError(403, 'Bu kaynaktan istek kabul edilmiyor');
  }
  const type = (req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
  if (type !== 'application/json') {
    throw new HttpError(415, 'Content-Type application/json olmalı');
  }
}
