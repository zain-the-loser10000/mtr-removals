import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero from '../components/PageHero.jsx';
import CallButton from '../components/CallButton.jsx';
import Icon from '../components/Icon.jsx';
import Img from '../components/Img.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { IMAGES, ABOUT_VALUES, PROPERTY_TYPES } from '../data/site.js';

const PROMISES = [
  { t: 'On time, every time', d: 'We give you a clear arrival window and we stick to it.' },
  { t: 'Clear pricing', d: 'You know the price before moving day. No hidden extras on the day.' },
  { t: 'Rooms set up on arrival', d: 'Beds rebuilt and furniture placed in the right room, not left in the hallway.' },
  { t: 'Respect for your home', d: 'Floors, walls and doorways protected. We leave it as we found it.' },
];

export default function About() {
  return (
    <>
      <Seo
        title="MTR Removals | About Our Local Removalists in Newcastle"
        description="About MTR Removals: a Newcastle NSW removal company built on punctual crews, written prices and careful handling. Speak to the team on 0469 799 346."
        path="/about"
      />
      <PageHero
        eyebrow="About us"
        title={<>About <span className="red">MTR Removals</span></>}
        text="Moving is stressful enough. MTR Removals was set up so your removalist never adds to it."
      />

      <section className="section">
        <div className="container about-grid">
          <Reveal className="about-media">
            <Img src={IMAGES.about} alt="Customers unpacking boxes after their MTR Removals move in Newcastle" />
            <div className="about-tag">
              <b>Local crew, own truck</b>
              <span>Newcastle NSW</span>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="about-copy">
            <p className="eyebrow">Our story</p>
            <h2>A Newcastle removal company with one job: get you moved properly</h2>
            <p>
              Everyone has heard a moving horror story: a late crew, a scratched table, a bill that grows at the end of the day.
              MTR Removals exists to be the opposite of that, for homes, offices and single items across the Hunter.
            </p>
            <p>
              We keep it simple. Arrive inside the time we give you, wrap every item, talk to you clearly, and finish the job the way
              we would want our own move done. That is how a local team earns its name, one move at a time.
            </p>
            <div className="about-call">
              <CallButton size="lg" label="Talk to our team" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow eyebrow-light">What we stand for</p>
            <h2>The MTR Removals standard on every job</h2>
          </Reveal>
          <div className="value-cards">
            {ABOUT_VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className="value-card">
                <span className="value-ico"><Icon name={v.icon} size={26} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Our promise</p>
            <h2>What to expect from MTR Removals on moving day</h2>
          </Reveal>
          <div className="promise-grid">
            {PROMISES.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08} className="promise">
                <span className="promise-n">0{i + 1}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">What we move</p>
            <h2>Properties MTR Removals moves in Newcastle</h2>
          </Reveal>
          <Reveal className="area-cloud">
            {PROPERTY_TYPES.map((a) => <span key={a} className="area-pill area-pill-light"><Icon name="Home" size={14} /> {a}</span>)}
            <span className="area-pill area-pill-red">+ Interstate relocations</span>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Questions before you book?"
        title="Talk to the MTR Removals team directly."
        text="Ask anything about your move, get honest advice, and decide with no pressure."
      />
    </>
  );
}
