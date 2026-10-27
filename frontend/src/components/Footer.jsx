import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { BUSINESS, SERVICES, IMAGES } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src={IMAGES.logo} alt="MTR Removals" className="footer-logo" width="170" height="62" loading="lazy" />
          <p className="footer-tag">{BUSINESS.tagline}</p>
          <p className="muted">Reliable, safe and professional removalists based in Newcastle NSW, moving homes and businesses across the Hunter and interstate.</p>
        </div>
        <div>
          <h3>Services</h3>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.slug}><Link to={`/services#${s.slug}`}>{s.title}</Link></li>
            ))}
            <li><Link to="/services#packing">Packing Assistance</Link></li>
          </ul>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/contact">Get a quote</Link></li>
            <li><Link to="/#faq">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul className="footer-contact">
            <li><Phone size={16} /><a href={BUSINESS.phoneHref}><b>{BUSINESS.phone}</b></a></li>
            <li><Mail size={16} /><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
            <li><MapPin size={16} /><span>{BUSINESS.area}<br />{BUSINESS.areaNote}</span></li>
            <li><Clock size={16} /><span>{BUSINESS.hours}</span></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} MTR Removals. All rights reserved.</span>
        <span>Removalists Newcastle NSW · Hunter Valley · Interstate</span>
      </div>
    </footer>
  );
}
