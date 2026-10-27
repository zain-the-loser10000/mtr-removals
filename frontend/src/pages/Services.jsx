import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import CallButton from '../components/CallButton.jsx';
import Icon from '../components/Icon.jsx';
import Img from '../components/Img.jsx';
import CtaBand from '../components/CtaBand.jsx';
import PageHero from '../components/PageHero.jsx';
import { SERVICES, PACKING, BUSINESS } from '../data/site.js';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: SERVICES.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.heading,
      description: s.body,
      provider: { '@id': 'https://www.mtrremovals.com.au/#business' },
      areaServed: 'Newcastle NSW',
      url: `https://www.mtrremovals.com.au/services#${s.slug}`,
    },
  })),
};

// Different call-to-action wording for each service block
const CALL_LABELS = {
  'home-moves': 'Book a home move',
  'office-moves': 'Plan an office move',
  'furniture-removals': 'Move an item today',
  'interstate-moves': 'Price an interstate move',
};

export default function Services() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
      <Seo
        title="MTR Removals | Home Moves, Office Moves, Furniture & Interstate Removals in Newcastle"
        description="MTR Removals services in Newcastle NSW: home moves, office moves, furniture removals, interstate moves and packing assistance. Get a price on 0469 799 346."
        path="/services"
        schema={schema}
      />
      <PageHero
        eyebrow="Our services"
        title={<>MTR Removals <span className="red">Services in Newcastle</span></>}
        text="Home, office, single item or interstate. Choose a service to see what is included, then call for your price."
      >
        <div className="jump-links">
          {SERVICES.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="jump"><Icon name={s.icon} size={16} /> {s.title}</a>
          ))}
          <a href="#packing" className="jump"><Icon name="Package" size={16} /> Packing</a>
        </div>
      </PageHero>

      {SERVICES.map((s, i) => (
        <section key={s.slug} id={s.slug} className={`section service-detail ${i % 2 ? 'is-flip' : ''}`}>
          <div className="container sd-grid">
            <Reveal className="sd-media">
              <Img src={s.image} alt={s.alt} />
              <span className="sd-num">0{i + 1}</span>
            </Reveal>
            <Reveal delay={0.1} className="sd-copy">
              <span className="sc-ico"><Icon name={s.icon} size={22} /></span>
              <h2>{s.title} <span className="muted-h">{s.heading.replace(s.title, '').trim()}</span></h2>
              <p className="lead">{s.body}</p>
              <ul className="ticks">
                {s.points.map((p) => <li key={p}><Check size={18} /> {p}</li>)}
              </ul>
              <div className="sd-actions">
                <CallButton label={CALL_LABELS[s.slug]} />
                <Link to="/contact" className="btn btn-ghost">Request a price <ArrowRight size={16} /></Link>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section id="packing" className="section section-soft">
        <div className="container sd-grid">
          <Reveal className="sd-media"><Img src={PACKING.image} alt="Stacked moving boxes for packing assistance in Newcastle" /></Reveal>
          <Reveal delay={0.1} className="sd-copy">
            <span className="sc-ico"><Icon name="Package" size={22} /></span>
            <h2>{PACKING.title} <span className="muted-h">in Newcastle</span></h2>
            <p className="lead">{PACKING.body}</p>
            <ul className="ticks">
              <li><Check size={18} /> Full or partial packing</li>
              <li><Check size={18} /> Kitchens and fragile items</li>
              <li><Check size={18} /> Quality boxes and wrapping supplied</li>
            </ul>
            <CallButton label="Add packing to my move" />
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Not sure what you need?"
        title="Tell us what's moving and we'll match the right service."
        text={`Describe your move on ${BUSINESS.phone} and get a firm price on the same call. Most quotes take under five minutes.`}
        linkLabel="Send my move details"
      />
    </>
  );
}
