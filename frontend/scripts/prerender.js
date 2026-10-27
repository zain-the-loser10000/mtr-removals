// Build step: turns the React app into static HTML files, one per page.
//   /          -> dist/index.html
//   /services  -> dist/services.html   (Vercel cleanUrls serves it at /services)
//   /about     -> dist/about.html
//   /contact   -> dist/contact.html
//   404        -> dist/404.html
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render } = await import(pathToFileURL(ssrEntry).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const ROUTES = [
  { url: '/', file: 'index.html' },
  { url: '/services', file: 'services.html' },
  { url: '/about', file: 'about.html' },
  { url: '/contact', file: 'contact.html' },
  { url: '/404', file: '404.html' },
];

// Tags React renders inside components that belong in <head>
const HEAD_TAG = /<title>[\s\S]*?<\/title>|<meta\s[^>]*?(?:name|property)="(?:description|robots|og:[^"]+|twitter:[^"]+)"[^>]*?\/?>|<link\s[^>]*?rel="canonical"[^>]*?\/?>/g;

for (const route of ROUTES) {
  let html = render(route.url);
  const head = (html.match(HEAD_TAG) || []).map((t) => t.replace(/^<(\w+)/, '<$1 data-prerender'));
  html = html.replace(HEAD_TAG, '');

  const page = template
    .replace('<!--app-head-->', head.join('\n    '))
    .replace('<!--app-html-->', html);

  fs.writeFileSync(path.join(dist, route.file), page);
  const title = (head.find((t) => t.startsWith('<title')) || '').replace(/<[^>]+>/g, '');
  console.log(`prerendered ${route.url.padEnd(10)} -> ${route.file.padEnd(14)} ${title}`);
}

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
