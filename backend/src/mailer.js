import nodemailer from 'nodemailer';
import { config } from './config.js';

const { mail, business } = config;
export const mailConfigured = Boolean(mail.user && mail.pass && mail.to);

const transporter = mailConfigured
  ? nodemailer.createTransport({
      host: mail.host,
      port: mail.port,
      secure: mail.secure,
      auth: { user: mail.user, pass: mail.pass },
    })
  : null;

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const MOVE_LABEL = {
  home: 'Home Move',
  office: 'Office Move',
  furniture: 'Furniture Removal',
  interstate: 'Interstate Move',
};

const fmtDate = (d) =>
  d ? new Date(d + 'T00:00:00').toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'Not set';

function row(label, value) {
  return `<tr>
    <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#666;font-size:13px;width:150px;vertical-align:top">${label}</td>
    <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#111;font-size:15px;font-weight:600">${value}</td>
  </tr>`;
}

function shell(title, inner) {
  return `<!doctype html><html><body style="margin:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden">
      <tr><td style="background:#0f1012;padding:20px 24px;border-bottom:4px solid #e30613">
        <span style="color:#fff;font-size:22px;font-weight:800;letter-spacing:1px">MTR <span style="color:#e30613">REMOVALS</span></span>
        <div style="color:#bbb;font-size:12px;letter-spacing:3px;margin-top:4px">${esc(title)}</div>
      </td></tr>
      <tr><td style="padding:24px">${inner}</td></tr>
      <tr><td style="background:#0f1012;color:#aaa;font-size:12px;padding:16px 24px;text-align:center">
        MTR Removals · Newcastle &amp; surrounding areas · Interstate moves available<br>
        <a href="tel:${business.phoneIntl}" style="color:#fff;text-decoration:none;font-weight:700">${business.phone}</a>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
}

export function businessEmail(e, id) {
  const telLink = `tel:${e.phone.replace(/[^\d+]/g, '')}`;
  const inner = `
    <p style="margin:0 0 6px;font-size:13px;color:#e30613;font-weight:700;letter-spacing:1px">NEW QUOTE REQUEST #${id}</p>
    <h1 style="margin:0 0 18px;font-size:22px;color:#111">${esc(MOVE_LABEL[e.move_type])} quote for ${esc(e.name)}</h1>
    <a href="${telLink}" style="display:inline-block;background:#e30613;color:#fff;text-decoration:none;font-weight:700;padding:14px 22px;border-radius:8px;margin-bottom:20px">📞 Call ${esc(e.phone)} now</a>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:8px">
      ${row('Name', esc(e.name))}
      ${row('Phone', `<a href="${telLink}" style="color:#e30613">${esc(e.phone)}</a>`)}
      ${row('Email', e.email ? `<a href="mailto:${esc(e.email)}" style="color:#e30613">${esc(e.email)}</a>` : '—')}
      ${row('Move type', esc(MOVE_LABEL[e.move_type]))}
      ${row('Property size', esc(e.property_size) || '—')}
      ${row('From', esc(e.move_from))}
      ${row('To', esc(e.move_to))}
      ${row('Move date', esc(fmtDate(e.move_date)) + (e.flexible_date ? ' (flexible)' : ''))}
      ${row('Packing help', e.packing_help ? 'Yes, wants packing assistance' : 'No')}
      ${row('Best time to call', esc(e.callback_time))}
      ${row('Details', esc(e.message).replace(/\n/g, '<br>') || '—')}
    </table>
    <p style="font-size:12px;color:#999;margin-top:16px">Submitted from: ${esc(e.source_page || 'website')}</p>`;
  return shell('WEBSITE ENQUIRY', inner);
}

export function customerEmail(e) {
  const first = esc(e.name.split(' ')[0]);
  const inner = `
    <h1 style="margin:0 0 12px;font-size:22px;color:#111">Thanks ${first}, we've got your request.</h1>
    <p style="font-size:15px;line-height:1.6;color:#333">One of the MTR Removals team will call you shortly to confirm your
    ${esc(MOVE_LABEL[e.move_type]).toLowerCase()} from <b>${esc(e.move_from)}</b> to <b>${esc(e.move_to)}</b> and give you a firm price.</p>
    <p style="font-size:15px;line-height:1.6;color:#333">Need it sooner? Call us directly and we'll lock in your date on the spot.</p>
    <a href="tel:${business.phoneIntl}" style="display:inline-block;background:#e30613;color:#fff;text-decoration:none;font-weight:700;padding:14px 22px;border-radius:8px;margin:8px 0 4px">Call ${business.phone}</a>
    <p style="font-size:13px;color:#888;margin-top:20px">Reliable · Safe · Professional</p>`;
  return shell('QUOTE REQUEST RECEIVED', inner);
}

export async function sendEnquiryEmails(e, id) {
  if (!mailConfigured) {
    console.warn('[mail] SMTP not configured. Enquiry saved to database only.');
    return { business: false, customer: false };
  }
  const from = `"${mail.fromName}" <${mail.user}>`;
  const result = { business: false, customer: false };

  await transporter.sendMail({
    from,
    to: mail.to,
    replyTo: e.email || undefined,
    subject: `New ${MOVE_LABEL[e.move_type]} enquiry: ${e.name} (${e.move_from} → ${e.move_to})`,
    html: businessEmail(e, id),
    text: `New enquiry #${id}\n${e.name} | ${e.phone} | ${e.email || '-'}\n${MOVE_LABEL[e.move_type]} ${e.property_size || ''}\nFrom: ${e.move_from}\nTo: ${e.move_to}\nDate: ${fmtDate(e.move_date)}${e.flexible_date ? ' (flexible)' : ''}\nPacking: ${e.packing_help ? 'yes' : 'no'}\nCall: ${e.callback_time}\n\n${e.message || ''}`,
  });
  result.business = true;

  if (mail.autoReply && e.email) {
    try {
      await transporter.sendMail({
        from: `"MTR Removals" <${mail.user}>`,
        to: e.email,
        replyTo: mail.to,
        subject: 'We received your moving quote request | MTR Removals',
        html: customerEmail(e),
        text: `Thanks ${e.name}, we've received your request and will call you shortly. Need it sooner? Call ${business.phone}.`,
      });
      result.customer = true;
    } catch (err) {
      console.error('[mail] auto-reply failed:', err.message);
    }
  }
  return result;
}

export async function verifyMail() {
  if (!mailConfigured) return false;
  try {
    await transporter.verify();
    return true;
  } catch (err) {
    console.error('[mail] SMTP verify failed:', err.message);
    return false;
  }
}
