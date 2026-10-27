import { motion } from 'framer-motion';

export default function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        <motion.p className="eyebrow eyebrow-light" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <span className="dot" /> {eyebrow}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}>
          {title}
        </motion.h1>
        {text && (
          <motion.p className="page-hero-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            {text}
          </motion.p>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            {children}
          </motion.div>
        )}
      </div>
      <div className="road road-dark" aria-hidden="true"><div className="road-dash" /></div>
    </section>
  );
}
