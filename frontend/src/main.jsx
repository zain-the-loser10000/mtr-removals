import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App.jsx';
import { IS_PREVIEW } from './data/site.js';
import './styles/global.css';

// Pages are pre-rendered at build time for SEO. React takes over from here and
// manages the <title> and meta tags itself, so drop the static copies first.
document.querySelectorAll('[data-prerender]').forEach((el) => el.remove());

// The hosted preview runs in a sandboxed frame, so it keeps routes in memory.
const Router = IS_PREVIEW ? MemoryRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
