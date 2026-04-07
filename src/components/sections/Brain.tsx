'use client'

import { motion } from 'framer-motion'

interface Props {
  t: {
    subtitle: string
    title: string
    description: string
    cta: string
    cta_github: string
    cta_demo: string
    cta_docs: string
  }
}

export function Brain({ t }: Props) {
  return (
    <section id="brain" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.div
        className="relative glass overflow-hidden"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Glow accent */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-15 blur-[80px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--cyan), var(--purple))' }}
        />

        <div className="relative z-10 p-8 md:p-12">
          {/* Header */}
          <span className="font-mono text-xs text-cyan tracking-widest uppercase">
            {t.subtitle}
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-text">
            {t.title}
          </h2>
          <p className="mt-4 text-muted text-base md:text-lg leading-relaxed max-w-2xl">
            {t.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="/brain"
              className="px-6 py-3 rounded-card font-semibold text-white text-sm transition-opacity hover:opacity-90 bg-gradient-vc"
            >
              {t.cta}
            </a>
            <a
              href="https://brain.tetardtek.com/ui/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-card font-semibold border border-border text-muted text-sm hover:border-pink hover:text-pink transition-colors"
            >
              {t.cta_demo}
            </a>
            <a
              href="https://brain.tetardtek.com/ui/docs.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-card font-semibold border border-border text-muted text-sm hover:border-purple hover:text-purple transition-colors"
            >
              {t.cta_docs}
            </a>
            <a
              href="https://github.com/Tetardtek/Cortex-Template"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-card font-semibold border border-border text-muted text-sm hover:border-cyan hover:text-cyan transition-colors"
            >
              {t.cta_github}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
