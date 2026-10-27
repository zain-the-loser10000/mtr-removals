import { useState } from 'react';
import { IMAGES } from '../data/site.js';

// Image with lazy loading and a local fallback if a remote photo fails.
export default function Img({ src, alt, fallback = IMAGES.truck, eager = false, ...rest }) {
  const [s, setS] = useState(src);
  return (
    <img
      src={s}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => s !== fallback && setS(fallback)}
      {...rest}
    />
  );
}
