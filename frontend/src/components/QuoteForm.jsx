import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Home, Building2, Sofa, MapPin, ArrowRight, CheckCircle2, Loader2, Phone, Lock } from 'lucide-react';
import { BUSINESS, IS_PREVIEW } from '../data/site.js';

const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const MOVE_TYPES = [
  { v: 'home', label: 'Home', Icon: Home },
  { v: 'office', label: 'Office', Icon: Building2 },
  { v: 'furniture', label: 'Furniture', Icon: Sofa },
  { v: 'interstate', label: 'Interstate', Icon: MapPin },
];
const SIZES = ['Single item', 'Studio / 1 bedroom', '2 bedroom', '3 bedroom', '4 bedroom', '5+ bedroom', 'Small office', 'Large office'];
const CALL_TIMES = [
  { v: 'anytime', label: 'Anytime' },
  { v: 'morning', label: 'Morning' },
  { v: 'afternoon', label: 'Afternoon' },
  { v: 'evening', label: 'Evening' },
];

const EMPTY = {
  name: '', phone: '', email: '', move_type: '', property_size: '', move_from: '', move_to: '',
  move_date: '', flexible_date: false, packing_help: false, callback_time: 'anytime', message: '', company_website: '',
};

const AU_PHONE = /^(?:\+?61|0)[2-478](?:[ -]?\d){8}$/;

function check(f) {
  // Order matches the form layout so focus jumps to the first visible error
  const e = {};
  if (!f.move_type) e.move_type = 'Choose what you are moving.';
  if (f.move_from.trim().length < 2) e.move_from = 'Suburb or postcode';
  if (f.move_to.trim().length < 2) e.move_to = 'Suburb or postcode';
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!AU_PHONE.test(f.phone.replace(/[()\s]/g, ''))) e.phone = 'Enter a valid Australian number, e.g. 0412 345 678';
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email = 'That email does not look right.';
  return e;
}

export default function QuoteForm({ compact = false, defaultType = '' }) {
  const [f, setF] = useState({ ...EMPTY, move_type: defaultType });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [serverMsg, setServerMsg] = useState('');
  const { pathname } = useLocation();
  const formRef = useRef(null);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const startedAt = useRef(Date.now());

  const set = (k) => (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    const next = { ...f, [k]: value };
    setF(next);
    if (touched[k] || errors[k]) setErrors((prev) => ({ ...prev, [k]: check(next)[k] }));
  };
  const pick = (k, v) => {
    const next = { ...f, [k]: v };
    setF(next);
    setErrors((prev) => ({ ...prev, [k]: check(next)[k] }));
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((prev) => ({ ...prev, [k]: check(f)[k] }));
  };

  async function submit(ev) {
    ev.preventDefault();
    const e = check(f);
    setErrors(e);
    setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])));
    if (Object.keys(e).length) {
      const first = document.querySelector(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus('sending');
    setServerMsg('');
    try {
      if (IS_PREVIEW) {
        // Preview has no backend: simulate a successful submission
        await new Promise((r) => setTimeout(r, 900));
        const card = formRef.current?.closest('.form-card') || formRef.current?.parentElement;
        setStatus('done');
        setTimeout(() => card?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
        return;
      }
      const res = await fetch(`${API}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, source_page: pathname, form_started: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.message || 'Could not send your request.');
      }
      const card = formRef.current?.closest('.form-card') || formRef.current?.parentElement;
      setStatus('done');
      setTimeout(() => card?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
    } catch (err) {
      setStatus('error');
      setServerMsg(err.message || 'Network error.');
    }
  }

  const err = (k) => touched[k] && errors[k];

  if (status === 'done') {
    return (
      <motion.div className="form-success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}>
          <CheckCircle2 size={56} className="success-ico" />
        </motion.div>
        <h3>Thanks {f.name.split(' ')[0]}, request received!</h3>
        <p>We will call you on <b>{f.phone}</b> shortly to confirm your price and date{f.email ? ', and we have sent a confirmation to your email' : ''}.</p>
        <p className="muted">Want it locked in right now?</p>
        <a href={BUSINESS.phoneHref} className="btn btn-primary btn-lg call-btn">
          <span className="call-ico"><Phone size={20} /></span> Call {BUSINESS.phone}
        </a>
        <button className="link-btn" onClick={() => { setF({ ...EMPTY }); setTouched({}); setErrors({}); setStatus('idle'); }}>
          Send another request
        </button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} className={`quote-form ${compact ? 'is-compact' : ''}`} onSubmit={submit} noValidate>
      {/* Honeypot for bots */}
      <div className="hp" aria-hidden="true">
        <label>Website<input name="company_website" tabIndex={-1} autoComplete="off" value={f.company_website} onChange={set('company_website')} /></label>
      </div>

      <fieldset className="field">
        <legend>{compact ? 'Type of move' : 'What are you moving?'} <span className="req">*</span></legend>
        <div className="chips" role="radiogroup">
          {MOVE_TYPES.map(({ v, label, Icon }) => (
            <button
              type="button"
              key={v}
              name="move_type"
              role="radio"
              aria-checked={f.move_type === v}
              className={`chip ${f.move_type === v ? 'is-active' : ''}`}
              onClick={() => pick('move_type', v)}
            >
              <Icon size={18} /> {label}
            </button>
          ))}
        </div>
        {err('move_type') && <p className="field-err">{errors.move_type}</p>}
      </fieldset>

      <div className="row-2">
        <Field label="Moving from" name="move_from" required placeholder="e.g. Merewether 2291" value={f.move_from} onChange={set('move_from')} onBlur={blur('move_from')} error={err('move_from')} autoComplete="address-level2" />
        <Field label="Moving to" name="move_to" required placeholder="e.g. Maitland 2320" value={f.move_to} onChange={set('move_to')} onBlur={blur('move_to')} error={err('move_to')} />
      </div>

      <div className="row-2">
        <Field label="Your name" name="name" required placeholder="Full name" value={f.name} onChange={set('name')} onBlur={blur('name')} error={err('name')} autoComplete="name" />
        <Field label="Phone" name="phone" type="tel" required inputMode="tel" placeholder="04xx xxx xxx" value={f.phone} onChange={set('phone')} onBlur={blur('phone')} error={err('phone')} autoComplete="tel" />
      </div>

      {!compact && (
        <>
          <div className="row-2">
            <Field label="Email (for your confirmation)" name="email" type="email" placeholder="you@email.com" value={f.email} onChange={set('email')} onBlur={blur('email')} error={err('email')} autoComplete="email" />
            <div className="field">
              <label htmlFor="property_size">Size of move</label>
              <select id="property_size" name="property_size" value={f.property_size} onChange={set('property_size')}>
                <option value="">Select size</option>
                {SIZES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="row-2">
            <div className="field">
              <label htmlFor="move_date">Preferred move date</label>
              <input id="move_date" name="move_date" type="date" min={today} value={f.move_date} onChange={set('move_date')} />
              <label className="check">
                <input type="checkbox" checked={f.flexible_date} onChange={set('flexible_date')} /> My date is flexible
              </label>
            </div>
            <fieldset className="field">
              <legend>Best time to call you</legend>
              <div className="chips chips-sm">
                {CALL_TIMES.map((c) => (
                  <button type="button" key={c.v} className={`chip ${f.callback_time === c.v ? 'is-active' : ''}`} onClick={() => pick('callback_time', c.v)} aria-pressed={f.callback_time === c.v}>
                    {c.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <label className={`toggle ${f.packing_help ? 'is-on' : ''}`}>
            <input type="checkbox" checked={f.packing_help} onChange={set('packing_help')} />
            <span className="toggle-track"><span className="toggle-thumb" /></span>
            <span><b>I'd like packing assistance</b><small>We supply boxes and pack for you</small></span>
          </label>

          <div className="field">
            <label htmlFor="message">Anything we should know?</label>
            <textarea id="message" name="message" rows={4} placeholder="Stairs, lifts, heavy items like a piano or fridge, parking access..." value={f.message} onChange={set('message')} maxLength={2000} />
          </div>
        </>
      )}

      <AnimatePresence>
        {status === 'error' && (
          <motion.div className="form-alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {serverMsg.includes(BUSINESS.phone) ? serverMsg : <>{serverMsg} Please try again or call <a href={BUSINESS.phoneHref}><b>{BUSINESS.phone}</b></a>.</>}
          </motion.div>
        )}
      </AnimatePresence>

      <button type="submit" className="btn btn-dark btn-lg btn-block submit-btn" disabled={status === 'sending'}>
        {status === 'sending' ? <><Loader2 className="spin" size={20} /> Sending...</> : <>Get my free quote <ArrowRight size={20} /></>}
      </button>
      <div className="form-foot">
        <span><Lock size={13} /> {compact ? 'We only use these details to call you back.' : 'Your details are only used to quote your move.'}</span>
        <span>Faster? <a href={BUSINESS.phoneHref}><b>Call {BUSINESS.phone}</b></a></span>
      </div>
    </form>
  );
}

function Field({ label, name, error, required, ...props }) {
  return (
    <div className={`field ${error ? 'has-err' : ''}`}>
      <label htmlFor={name}>{label} {required && <span className="req">*</span>}</label>
      <input id={name} name={name} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-err` : undefined} {...props} />
      {error && <p className="field-err" id={`${name}-err`}>{error}</p>}
    </div>
  );
}
