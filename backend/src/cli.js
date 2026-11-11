/**
 * Administration commands (run on the server, never exposed over HTTP):
 *   npm run cli -- create-admin <email> <password> [displayName]
 *   npm run cli -- approve <email>
 */
import { query, pool } from './db.js';
import { migrate } from './migrate.js';
import { hashPassword } from './auth/passwords.js';
import { ensureTracks } from './seed.js';

const [cmd, ...args] = process.argv.slice(2);
const EMAIL = (v) => String(v || '').trim().toLowerCase();

async function main() {
  await migrate();
  await ensureTracks();
  if (cmd === 'create-admin') {
    const [email, password, name = ''] = args;
    if (!email || !password || password.length < 10) throw new Error('Kullanım: create-admin <email> <şifre (≥10)> [ad]');
    const hash = await hashPassword(password);
    await query(
      `INSERT INTO users (email, display_name, password_hash, role, status, approved_at)
       VALUES ($1, $2, $3, 'admin', 'approved', now())
       ON CONFLICT ((lower(email))) DO UPDATE SET role = 'admin', status = 'approved',
         password_hash = EXCLUDED.password_hash, approved_at = now()`,
      [EMAIL(email), name, hash]
    );
    console.log(`Yönetici hazır: ${EMAIL(email)}`);
  } else if (cmd === 'approve') {
    const { rowCount } = await query(
      `UPDATE users SET status = 'approved', approved_at = now() WHERE lower(email) = $1`, [EMAIL(args[0])]
    );
    console.log(rowCount ? 'Onaylandı' : 'Kullanıcı bulunamadı');
  } else {
    console.log('Komutlar: create-admin <email> <şifre> [ad], approve <email>');
  }
}

main()
  .catch((err) => { console.error(err.message); process.exitCode = 1; })
  .finally(() => pool.end());
