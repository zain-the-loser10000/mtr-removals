import { Link } from 'react-router-dom';
import CallButton from '../components/CallButton.jsx';

export default function NotFound() {
  return (
    <section className="section notfound">
      <title>Page not found | MTR Removals</title>
      <meta name="robots" content="noindex" />
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>This page has moved out.</h1>
        <p className="lead">The page you are looking for doesn't exist. Let's get you back on the road.</p>
        <div className="hero-actions">
          <Link to="/" className="btn btn-dark btn-lg">Back to home</Link>
          <CallButton size="lg" />
        </div>
      </div>
    </section>
  );
}
