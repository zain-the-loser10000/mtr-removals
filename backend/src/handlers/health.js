import { dbConfigured } from '../db.js';
import { mailConfigured } from '../mailer.js';

export default function healthHandler(_req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(
    JSON.stringify({
      ok: true,
      service: 'mtr-removals-api',
      database: dbConfigured ? 'connected' : 'missing DATABASE_URL',
      email: mailConfigured ? 'configured' : 'missing SMTP_USER / SMTP_PASS',
    })
  );
}
