import pg from 'pg';
import { config } from './config.js';

// Same as database/schema.sql. Kept here so the table is created
// automatically on Vercel without running anything by hand.
const SCHEMA = `
CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  move_type TEXT NOT NULL,
  property_size TEXT,
  move_from TEXT NOT NULL,
  move_to TEXT NOT NULL,
  move_date DATE,
  flexible_date BOOLEAN NOT NULL DEFAULT FALSE,
  packing_help BOOLEAN NOT NULL DEFAULT FALSE,
  callback_time TEXT,
  message TEXT,
  source_page TEXT,
  ip_address TEXT,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  email_sent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries (status);
`;

export const dbConfigured = Boolean(config.databaseUrl);

let pool;
let ready;

// Allow tests to inject any client with a pg-compatible query(sql, params) method
export function setClient(client) {
  pool = client;
  ready = undefined;
}

function getPool() {
  if (!pool) {
    const local = /localhost|127\.0\.0\.1/.test(config.databaseUrl);
    pool = new pg.Pool({
      connectionString: config.databaseUrl,
      ssl: local ? false : { rejectUnauthorized: false },
      max: 3, // serverless: keep connections low
      idleTimeoutMillis: 10_000,
    });
  }
  return pool;
}

async function db() {
  const p = getPool();
  if (!ready) ready = p.query(SCHEMA).catch((e) => { ready = undefined; throw e; });
  await ready;
  return p;
}

export async function saveEnquiry(e) {
  const p = await db();
  const { rows } = await p.query(
    `INSERT INTO enquiries
      (name, phone, email, move_type, property_size, move_from, move_to, move_date,
       flexible_date, packing_help, callback_time, message, source_page, ip_address, user_agent)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
     RETURNING id`,
    [
      e.name, e.phone, e.email, e.move_type, e.property_size || null, e.move_from, e.move_to,
      e.move_date || null, e.flexible_date, e.packing_help, e.callback_time, e.message || null,
      e.source_page || null, e.ip_address || null, e.user_agent || null,
    ]
  );
  return rows[0].id;
}

export async function markEmailSent(id) {
  const p = await db();
  await p.query('UPDATE enquiries SET email_sent = TRUE WHERE id = $1', [id]);
}

export async function listEnquiries({ limit = 100, status } = {}) {
  const p = await db();
  const { rows } = status
    ? await p.query('SELECT * FROM enquiries WHERE status = $1 ORDER BY id DESC LIMIT $2', [status, limit])
    : await p.query('SELECT * FROM enquiries ORDER BY id DESC LIMIT $1', [limit]);
  return rows;
}

export async function updateStatus(id, status) {
  const p = await db();
  const { rowCount } = await p.query('UPDATE enquiries SET status = $1 WHERE id = $2', [status, id]);
  return rowCount;
}
