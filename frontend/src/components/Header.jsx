import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, MapPin, Mail } from 'lucide-react';
import { BUSINESS, IMAGES } from '../data/site.js';
import CallButton from './CallButton.jsx';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span><MapPin size={14} /> Newcastle<span className="tb-long">&nbsp;and surrounding areas</span>&nbsp;·&nbsp;<b>{BUSINESS.areaNote}</b></span>
          <a href={`mailto:${BUSINESS.email}`} className="topbar-mail"><Mail size={14} /> {BUSINESS.email}</a>
        </div>
      </div>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="MTR Removals home">
            <img src={IMAGES.logo} alt="MTR Removals logo" width="150" height="55" />
          </Link>

          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className="nav-link">
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-cta">
            <div className="header-call-label">
              <small>Call for a quote</small>
              <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
            </div>
            <CallButton label="Call Now" size="sm" className="header-callbtn" />
            <button className="burger" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <NavLink to={n.to} end={n.to === '/'} className="mobile-link">{n.label}</NavLink>
                </motion.div>
              ))}
            </nav>
            <CallButton size="lg" label={`Call ${BUSINESS.phone}`} className="btn-block" />
            <Link to="/contact" className="btn btn-ghost btn-lg btn-block">Get a free quote</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
