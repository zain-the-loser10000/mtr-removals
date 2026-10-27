import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import CallButton from './CallButton.jsx';

// Each page passes its own wording so no two CTA sections read the same.
export default function CtaBand({ eyebrow, title, text, linkLabel }) {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <Reveal>
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="cta-text">{text}</p>
        </Reveal>
        <Reveal delay={0.1} className="cta-actions">
          <CallButton size="lg" variant="white" />
          {linkLabel && <Link to="/contact" className="btn btn-outline-light btn-lg">{linkLabel}</Link>}
        </Reveal>
      </div>
    </section>
  );
}
