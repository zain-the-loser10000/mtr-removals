import { config } from '../config.js';
import { validateEnquiry, STATUSES } from '../validate.js';
import { saveEnquiry, markEmailSent, listEnquiries, updateStatus, dbConfigured } from '../db.js';
import { sendEnquiryEmails, mailConfigured } from '../mailer.js';

const send = (res, code, body) => {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
};

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body; // Vercel / Express already parsed it
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 20_000) throw new Error('Body too large');
  }
  return raw ? JSON.parse(raw) : {};
}

function isAdmin(req) {
  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  return Boolean(config.adminToken) && !config.adminToken.startsWith('change-this') && token === config.adminToken;
}

// POST   /api/enquiries        public: new quote request
// GET    /api/enquiries        admin: list leads   (?status=new&limit=50)
// PATCH  /api/enquiries?id=12  admin: { "status": "booked" }
export default async function enquiriesHandler(req, res) {
  try {
    if (req.method === 'POST') return await createEnquiry(req, res);

    if (req.method === 'GET' || req.method === 'PATCH') {
      if (!isAdmin(req)) return send(res, 401, { ok: false, message: 'Unauthorised' });
      if (!dbConfigured) return send(res, 503, { ok: false, message: 'Database not connected. Add DATABASE_URL.' });
      const url = new URL(req.url, 'http://localhost');

      if (req.method === 'GET') {
        const limit = Math.min(Number(url.searchParams.get('limit')) || 100, 500);
        const status = STATUSES.includes(url.searchParams.get('status')) ? url.searchParams.get('status') : undefined;
        return send(res, 200, { ok: true, enquiries: await listEnquiries({ limit, status }) });
      }

      const body = await readBody(req);
      const id = Number(url.searchParams.get('id') || body.id);
      if (!id || !STATUSES.includes(body.status)) {
        return send(res, 422, { ok: false, message: `Send id and a status of ${STATUSES.join(', ')}` });
      }
      const changed = await updateStatus(id, body.status);
      return send(res, changed ? 200 : 404, { ok: Boolean(changed) });
    }

    res.setHeader('Allow', 'POST, GET, PATCH');
    return send(res, 405, { ok: false, message: 'Method not allowed' });
  } catch (err) {
    console.error('[enquiries]', err);
    return send(res, 500, { ok: false, message: `Something went wrong. Please call ${config.business.phone}.` });
  }
}

async function createEnquiry(req, res) {
  let body;
  try {
    body = await readBody(req);
  } catch {
    return send(res, 400, { ok: false, message: 'Invalid request.' });
  }

  const result = validateEnquiry(body);
  if (result.spam) return send(res, 201, { ok: true, id: 0 }); // quietly ignore bots
  if (!result.valid) {
    return send(res, 422, { ok: false, message: 'Please check the highlighted fields.', errors: result.errors });
  }

  const enquiry = {
    ...result.data,
    email: result.data.email || null,
    move_date: result.data.move_date || null,
    ip_address: String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim(),
    user_agent: String(req.headers['user-agent'] || '').slice(0, 255),
  };

  // 1. Save the lead (if a database is connected)
  let id = 0;
  if (dbConfigured) {
    try {
      id = await saveEnquiry(enquiry);
    } catch (err) {
      console.error('[db] save failed:', err.message);
    }
  }

  // 2. Email it. Serverless functions stop after responding, so we wait for the email.
  let emailed = false;
  if (mailConfigured) {
    try {
      const r = await sendEnquiryEmails(enquiry, id || 'web');
      emailed = r.business;
      if (emailed && id) await markEmailSent(id).catch(() => {});
    } catch (err) {
      console.error('[mail] send failed:', err.message);
    }
  }

  // Never tell a customer "sent" if the lead went nowhere
  if (!id && !emailed) {
    return send(res, 503, {
      ok: false,
      message: `We couldn't send your request right now. Please call ${config.business.phone}.`,
    });
  }

  return send(res, 201, { ok: true, id });
}
