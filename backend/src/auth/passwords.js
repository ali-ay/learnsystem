import crypto from 'crypto';

const N = 16384, R = 8, P = 1, KEYLEN = 64;

function scrypt(password, salt, options) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, KEYLEN, options, (err, key) => (err ? reject(err) : resolve(key)));
  });
}

/** Returns "scrypt$N$r$p$salt$hash" (both salt and hash base64). */
export async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const key = await scrypt(password, salt, { N, r: R, p: P, maxmem: 64 * 1024 * 1024 });
  return ['scrypt', N, R, P, salt.toString('base64'), key.toString('base64')].join('$');
}

export async function verifyPassword(password, stored) {
  const [scheme, n, r, p, saltB64, hashB64] = String(stored).split('$');
  if (scheme !== 'scrypt') return false;
  const expected = Buffer.from(hashB64, 'base64');
  const key = await scrypt(password, Buffer.from(saltB64, 'base64'), {
    N: Number(n), r: Number(r), p: Number(p), maxmem: 64 * 1024 * 1024
  });
  return key.length === expected.length && crypto.timingSafeEqual(key, expected);
}
