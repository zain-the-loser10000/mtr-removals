// Local development only. On Vercel the files in /api run these same handlers.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
dotenv.config({ path: path.join(root, '.env') });

const { default: express } = await import('express');
const { default: enquiries } = await import('./handlers/enquiries.js');
const { default: health } = await import('./handlers/health.js');
const { verifyMail } = await import('./mailer.js');

const app = express();
app.use(express.json({ limit: '20kb' }));
app.all('/api/enquiries', enquiries);
app.get('/api/health', health);

const port = Number(process.env.API_PORT) || 5000;
app.listen(port, async () => {
  console.log(`MTR Removals API on http://localhost:${port}  (frontend dev server proxies /api here)`);
  console.log((await verifyMail()) ? 'Email: ready' : 'Email: not configured or login failed (check SMTP_* in .env)');
  console.log(process.env.DATABASE_URL || process.env.POSTGRES_URL ? 'Database: DATABASE_URL set' : 'Database: DATABASE_URL missing (leads only emailed)');
});
