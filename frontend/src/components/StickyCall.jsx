import { Link } from 'react-router-dom';
import { Phone, FileText } from 'lucide-react';
import { BUSINESS } from '../data/site.js';

// Mobile: fixed bottom bar. Desktop: floating pulsing call bubble.
export default function StickyCall() {
  return (
    <>
      <div className="sticky-bar" role="region" aria-label="Quick contact">
        <a href={BUSINESS.phoneHref} className="sticky-call">
          <Phone size={19} strokeWidth={2.5} /> Call Now
        </a>
        <Link to="/contact" className="sticky-quote">
          <FileText size={18} /> Free Quote
        </Link>
      </div>
      <a href={BUSINESS.phoneHref} className="float-call" aria-label={`Call ${BUSINESS.phone}`}>
        <span className="float-ring" />
        <Phone size={24} strokeWidth={2.4} />
        <span className="float-tip">Call {BUSINESS.phone}</span>
      </a>
    </>
  );
}
