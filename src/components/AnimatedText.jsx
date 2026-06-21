import { motion } from 'framer-motion';

// Splits text into letters and animates each one
export function AnimatedLetters({ text, className = '', delay = 0 }) {
  return (
    <span className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Splits text into words and animates each word sliding up
export function AnimatedWords({ text, className = '', delay = 0, once = true }) {
  const words = text.split(' ');
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once }}
            transition={{
              duration: 0.55,
              delay: delay + i * 0.08,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Fade + slide up for paragraph text, word by word
export function AnimatedParagraph({ text, className = '', delay = 0 }) {
  const words = text.split(' ');
  return (
    <p className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            ease: 'easeOut',
          }}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

// Glitch-flash reveal for section labels (the small uppercase badges)
export function AnimatedLabel({ text, className = '' }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.05, duration: 0.2 }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.p>
  );
}

// Typewriter effect — used in hero
export function TypeWriter({ texts, className = '' }) {
  return (
    <motion.span className={className}>
      {texts}
    </motion.span>
  );
}
