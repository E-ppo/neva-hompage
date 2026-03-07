'use client'

import { motion } from 'framer-motion'

export function FallbackScene() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-deep">
      <motion.h1
        className="font-heading text-text-primary"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        eppo
      </motion.h1>
      <motion.p
        className="mt-4 font-body text-text-secondary"
        style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)' }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Frontend Developer
      </motion.p>
      <motion.div
        className="mt-6 flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        {['React', 'Three.js', 'React Native', 'TypeScript'].map((keyword) => (
          <span
            key={keyword}
            className="rounded-full px-4 py-1.5 text-sm text-accent"
            style={{ background: 'var(--accent-subtle)' }}
          >
            {keyword}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
