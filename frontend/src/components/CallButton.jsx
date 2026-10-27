import { Phone } from 'lucide-react';
import { BUSINESS } from '../data/site.js';

export default function CallButton({ variant = 'primary', size = 'md', label, className = '' }) {
  return (
    <a
      href={BUSINESS.phoneHref}
      className={`btn btn-${variant} btn-${size} call-btn ${className}`}
      aria-label={`Call MTR Removals on ${BUSINESS.phone}`}
    >
      <span className="call-ico">
        <Phone size={size === 'lg' ? 20 : 17} strokeWidth={2.4} />
      </span>
      <span>{label || BUSINESS.phone}</span>
    </a>
  );
}
