import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero from '../components/PageHero.jsx';
import QuoteForm from '../components/QuoteForm.jsx';
import { BUSINESS, IS_PREVIEW } from '../data/site.js';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact MTR Removals',
  url: 'https://www.mtrremovals.com.au/contact',
  mainEntity: { '@id': 'https://www.mtrremovals.com.au/#business' },
};

export default function Contact() {
  const sms = `sms:+61469799346?&body=${encodeURIComponent("Hi MTR Removals, I'd like a quote for a move from ___ to ___ on ___.")}`;
  return (
    <>
      <Seo
        title="MTR Removals | Contact Us for a Free Moving Quote in Newcastle"
        description="Contact MTR Removals in Newcastle NSW. Phone 0469 799 346, email mtrremovals.au@gmail.com or send your move details for a free removalist quote."
        path="/contact"
        schema={schema}
      />
      <PageHero
        eyebrow="Contact"
        title={<>Contact <span className="red">MTR Removals</span></>}
        text="Phone for the quickest booking, or fill in the form and a removalist will ring you back with a free quote."
      />

      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-side">
            <Reveal className="big-call">
              <p className="eyebrow eyebrow-light">Fastest way to book</p>
              <a href={BUSINESS.phoneHref} className="big-call-num">
                <span className="big-call-ico"><Phone size={26} /></span>
                {BUSINESS.phone}
              </a>
              <p>Speak to the team, get a price and lock in your date in one call.</p>
              <a href={BUSINESS.phoneHref} className="btn btn-white btn-lg btn-block call-btn">
                <span className="call-ico"><Phone size={18} /></span> Tap to call
              </a>
              <a href={sms} className="btn btn-outline-light btn-block"><MessageSquare size={18} /> Send a text instead</a>
            </Reveal>

            <Reveal delay={0.1} className="contact-list">
              <a href={`mailto:${BUSINESS.email}`} className="ci">
                <span className="ci-ico"><Mail size={20} /></span>
                <span><small>Email</small><b>{BUSINESS.email}</b></span>
              </a>
              <div className="ci">
                <span className="ci-ico"><MapPin size={20} /></span>
                <span><small>Service area</small><b>Greater Newcastle and the Hunter</b><em>Plus trips to every state</em></span>
              </div>
              <div className="ci">
                <span className="ci-ico"><Clock size={20} /></span>
                <span><small>Phone lines</small><b>{BUSINESS.hours}</b></span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05} className="form-card form-card-lg">
            <h2>Get your moving quote</h2>
            <p className="muted">Fill this in and we'll call you back with a clear price. Fields marked <span className="req">*</span> are required.</p>
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      {!IS_PREVIEW && (
        <section className="map-wrap" aria-label="Map of Newcastle NSW service area">
          <iframe
            title="MTR Removals service area: Newcastle NSW"
            src="https://www.google.com/maps?q=Newcastle+NSW+Australia&z=10&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      )}
    </>
  );
}
