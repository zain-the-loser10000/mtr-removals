import { BUSINESS } from '../data/site.js';

// React 19 hoists <title>, <meta> and <link> into <head> automatically.
export default function Seo({ title, description, path = '/', schema }) {
  const url = BUSINESS.website + path;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </>
  );
}
