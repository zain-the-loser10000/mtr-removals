import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, Copy, Check, X, FileText } from 'lucide-react';
import { BUSINESS, IS_PREVIEW } from '../data/site.js';

const KINDS = {
  tel: { Icon: Phone, title: 'Call MTR Removals', label: 'Phone', action: 'Call now', value: BUSINESS.phone },
  sms: { Icon: MessageSquare, title: 'Text MTR Removals', label: 'Mobile', action: 'Open messages', value: BUSINESS.phone },
  mailto: { Icon: Mail, title: 'Email MTR Removals', label: 'Email', action: 'Open email app', value: BUSINESS.email },
};

// Phones dial straight away. On computers (and inside the preview, where phone and
// email links are blocked) every call, text and email button opens this panel instead,
// so the button always does something useful.
export default function ContactSheet() {
  const [sheet, setSheet] = useState(null); // { kind, href }
  const [copied, setCopied] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="tel:"], a[href^="sms:"], a[href^="mailto:"]');
      if (!a || a.dataset.direct === 'true') return;
      const touch = window.matchMedia?.('(pointer: coarse)').matches;
      if (!IS_PREVIEW && touch) return; // real phone: let the dialler open
      e.preventDefault();
      const kind = a.getAttribute('href').split(':')[0];
      setCopied(false);
      setSheet({ kind, href: a.getAttribute('href') });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (!sheet) return;
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && setSheet(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [sheet]);

  const k = sheet && KINDS[sheet.kind];

  const copy = (e) => {
    const text = k.value;
    // 1. Select the text and use the classic copy command (works even where the
    //    Clipboard API is blocked); the text stays highlighted as a visible cue.
    const el = e.currentTarget.closest('.sheet').querySelector('.sheet-value');
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try { document.execCommand('copy'); } catch { /* ignore */ }
    // 2. Also try the modern Clipboard API without waiting on it
    try { navigator.clipboard?.writeText(text).catch(() => {}); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {sheet && (
        <motion.div
          className="sheet-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSheet(null)}
        >
          <motion.div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button ref={closeRef} className="sheet-close" onClick={() => setSheet(null)} aria-label="Close">
              <X size={20} />
            </button>
            <span className="sheet-ico"><k.Icon size={26} /></span>
            <h2 id="sheet-title">{k.title}</h2>
            <p className="sheet-label">{k.label}</p>
            <p className="sheet-value">{k.value}</p>
            {sheet.kind === 'tel' && <p className="sheet-note">{BUSINESS.hours}</p>}

            <div className="sheet-actions">
              <button className="btn btn-primary btn-lg btn-block" onClick={copy}>
                {copied ? <><Check size={18} /> Copied</> : <><Copy size={18} /> Copy {sheet.kind === 'mailto' ? 'email' : 'number'}</>}
              </button>
              <a href={sheet.href} data-direct="true" className="btn btn-ghost btn-lg btn-block">
                <k.Icon size={18} /> {k.action}
              </a>
              <Link to="/contact" className="btn btn-dark btn-lg btn-block" onClick={() => setSheet(null)}>
                <FileText size={18} /> Send my move details instead
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
