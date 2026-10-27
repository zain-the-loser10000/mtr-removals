import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Plus, Clock } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import CallButton from '../components/CallButton.jsx';
import Icon from '../components/Icon.jsx';
import Img from '../components/Img.jsx';
import QuoteForm from '../components/QuoteForm.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { BUSINESS, IMAGES, SERVICES, VALUES, STEPS, AREAS, FAQS, PACKING } from '../data/site.js';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function Home() {
  const reduce = useReducedMotion();
  const words = ['MTR Removals', 'in Newcastle'];

  return (
    <>
      <Seo
        title="MTR Removals in Newcastle | Home, Office, Furniture & Interstate Removalists"
        description="MTR Removals are local removalists in Newcastle NSW for home moves, office moves, furniture removals and interstate moves. Reliable, safe and professional. Call 0469 799 346 for a free quote."
        path="/"
        schema={faqSchema}
      />

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="dot" /> {BUSINESS.tagline}
            </motion.p>
            <h1 className="hero-title hero-title-words">
              {words.map((w, i) => (
                <motion.span
                  key={w}
                  className={i === 0 ? 'red' : ''}
                  initial={reduce ? false : { opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.09 }}
                >
                  {w}{' '}
                </motion.span>
              ))}
            </h1>
            <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              MTR Removals handles home moves, office moves, furniture removals and interstate moves from Newcastle. Local crew, padded furniture, clear prices before we lift a box.
            </motion.p>

            <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <CallButton size="xl" label={`Call ${BUSINESS.phone}`} className="pulse" />
              <Link to="/contact" className="btn btn-ghost btn-xl">Free quote <ArrowRight size={18} /></Link>
            </motion.div>

            <motion.ul className="hero-trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              <li><Check size={16} /> Reliable</li>
              <li><Check size={16} /> Safe</li>
              <li><Check size={16} /> Professional</li>
              <li><Clock size={16} /> Quick call-back</li>
            </motion.ul>
          </div>

          <motion.div
            className="hero-media"
            initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="hero-img-wrap">
              <img src={IMAGES.hero} alt="MTR Removals removalists carrying a wrapped sofa into a removal truck in Newcastle" width="644" height="785" fetchPriority="high" />
            </div>
            <motion.div className="hero-badge" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, type: 'spring', stiffness: 120 }}>
              <span className="hb-ico"><Icon name="MapPin" size={20} /></span>
              <span><b>Based in Newcastle NSW</b><small>Covering the whole Hunter region</small></span>
            </motion.div>
            <div className="hero-stripe" aria-hidden="true" />
          </motion.div>
        </div>
        <div className="road" aria-hidden="true"><div className="road-dash" /></div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">What we move</p>
            <h2>Removal services across Newcastle and beyond</h2>
            <p className="lead">From a single sofa to a full office, the MTR Removals crew handles your move start to finish.</p>
          </Reveal>
          <div className="service-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <Link to={`/services#${s.slug}`} className="service-card service-card-photo">
                  <div className="sc-img"><Img src={s.image} alt={s.alt} /></div>
                  <div className="sc-body">
                    <span className="sc-ico"><Icon name={s.icon} size={22} /></span>
                    <h3>{s.title}</h3>
                    <p>{s.short}</p>
                    <span className="sc-more">Learn more <ArrowUpRight size={16} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="packing-strip">
            <span className="sc-ico"><Icon name="Package" size={22} /></span>
            <div>
              <b>{PACKING.title}</b>
              <span> {PACKING.teaser}</span>
            </div>
            <Link to="/services#packing" className="btn btn-ghost btn-sm">Details</Link>
          </Reveal>
        </div>
      </section>

      {/* WHY US */}
      <section className="section section-dark">
        <div className="container why-grid">
          <Reveal className="why-media">
            <Img src={IMAGES.truck} alt="MTR Removals white removal truck with boxes and furniture" />
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow eyebrow-light">Why choose MTR Removals</p>
              <h2>Newcastle movers who handle your things like their own</h2>
            </Reveal>
            <div className="values">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.1} className="value">
                  <span className="value-ico"><Icon name={v.icon} size={24} /></span>
                  <div>
                    <h3>{v.title}</h3>
                    <p>{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3}><CallButton size="lg" label={`Book now: ${BUSINESS.phone}`} /></Reveal>
          </div>
        </div>
      </section>

      {/* STEPS + QUICK QUOTE */}
      <section className="section">
        <div className="container steps-grid">
          <div>
            <Reveal>
              <p className="eyebrow">How it works</p>
              <h2>Book MTR Removals in three simple steps</h2>
            </Reveal>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <Reveal as="li" key={s.n} delay={i * 0.1} className="step">
                  <span className="step-n">{s.n}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal className="call-card">
              <p>The fastest way to book is a quick call.</p>
              <a href={BUSINESS.phoneHref} className="call-card-num">{BUSINESS.phone}</a>
              <small>Answered 7 days a week</small>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="form-card">
            <h3>Quick quote</h3>
            <p className="muted">Two minutes. We call you back with a price.</p>
            <QuoteForm compact />
          </Reveal>
        </div>
      </section>

      {/* AREAS */}
      <section className="section areas" style={{ '--bg': `url(${IMAGES.newcastle})` }}>
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow eyebrow-light">Service areas</p>
            <h2>Removalists for Newcastle, Lake Macquarie, Maitland &amp; the Hunter</h2>
            <p className="lead">From the beaches of Merewether to the Hunter Valley vineyards, MTR Removals moves families and businesses all over the region.</p>
          </Reveal>
        </div>
        <div className="marquee" aria-label="Suburbs we service">
          <div className="marquee-track">
            {[...AREAS, ...AREAS].map((a, i) => (
              <span key={i} className="area-pill" aria-hidden={i >= AREAS.length}><Icon name="MapPin" size={14} /> {a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container faq-wrap">
          <Reveal className="section-head">
            <p className="eyebrow">FAQs</p>
            <h2>MTR Removals FAQs for moving in Newcastle</h2>
          </Reveal>
          <Faq />
        </div>
      </section>

      <CtaBand
        eyebrow="Ready when you are"
        title="Moving in Newcastle? Book MTR Removals today."
        text="Weekend and end of month dates fill up first. One quick call gets you a price and a confirmed booking."
        linkLabel="Request a quote online"
      />
    </>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {FAQS.map((f, i) => (
        <Reveal key={f.q} delay={i * 0.04} className={`faq-item ${open === i ? 'is-open' : ''}`}>
          <h3>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              {f.q}
              <Plus className="faq-plus" size={20} />
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="faq-a">
                <p>{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      ))}
    </div>
  );
}
