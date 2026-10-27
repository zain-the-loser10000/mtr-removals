export const MOVE_TYPES = ['home', 'office', 'furniture', 'interstate'];
export const CALLBACK_TIMES = ['anytime', 'morning', 'afternoon', 'evening'];
export const STATUSES = ['new', 'contacted', 'booked', 'closed'];

const clean = (v, max = 200) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max) : '';

// Australian numbers: 04xx xxx xxx, 02 xxxx xxxx, +61 ...
const AU_PHONE = /^(?:\+?61|0)[2-478](?:[ -]?\d){8}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(body = {}) {
  const errors = {};

  // Honeypot: real people never fill this hidden field
  if (clean(body.company_website)) return { spam: true };
  // Bots submit instantly; people take a few seconds to fill the form
  const started = Number(body.form_started);
  if (started && Date.now() - started < 2500) return { spam: true };

  const data = {
    name: clean(body.name, 80),
    phone: clean(body.phone, 20),
    email: clean(body.email, 120).toLowerCase(),
    move_type: clean(body.move_type, 20),
    property_size: clean(body.property_size, 40),
    move_from: clean(body.move_from, 120),
    move_to: clean(body.move_to, 120),
    move_date: clean(body.move_date, 10),
    flexible_date: Boolean(body.flexible_date),
    packing_help: Boolean(body.packing_help),
    callback_time: clean(body.callback_time, 20) || 'anytime',
    message: clean(body.message, 2000),
    source_page: clean(body.source_page, 100),
  };

  if (data.name.length < 2) errors.name = 'Please enter your name.';
  if (!AU_PHONE.test(data.phone.replace(/[()\s]/g, ''))) errors.phone = 'Please enter a valid Australian phone number.';
  if (data.email && !EMAIL.test(data.email)) errors.email = 'That email address does not look right.';
  if (!MOVE_TYPES.includes(data.move_type)) errors.move_type = 'Please choose a move type.';
  if (data.move_from.length < 2) errors.move_from = 'Where are you moving from?';
  if (data.move_to.length < 2) errors.move_to = 'Where are you moving to?';
  if (!CALLBACK_TIMES.includes(data.callback_time)) data.callback_time = 'anytime';

  if (data.move_date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.move_date) || Number.isNaN(Date.parse(data.move_date))) {
      errors.move_date = 'Please pick a valid date.';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(data.move_date) < today) errors.move_date = 'Move date cannot be in the past.';
    }
  }

  return { data, errors, valid: Object.keys(errors).length === 0 };
}
