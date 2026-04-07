'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { BackToTop } from '@/components/ui/BackToTop'
import type { Lang, BrainFeature, BrainMilestone } from '@/types'
import fr from '@/i18n/fr.json'
import en from '@/i18n/en.json'

const translations = { fr, en }

export default function BrainPage() {
  const [lang, setLang] = useState<Lang>('fr')
  const [features, setFeatures] = useState<BrainFeature[]>([])
  const [milestones, setMilestones] = useState<BrainMilestone[]>([])
  const t = translations[lang]

  useEffect(() => {
    fetch('/api/brain/features').then(r => r.json()).then(setFeatures)
    fetch('/api/brain/milestones').then(r => r.json()).then(setMilestones)
  }, [])

  return (
    <>
      <Navbar lang={lang} onLangChange={setLang} nav={t.nav} />

      <main className="pt-24">
        {/* Hero */}
        <section className="px-6 max-w-4xl mx-auto text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs text-cyan tracking-widest uppercase">
              {t.brain.subtitle}
            </span>
            <h1 className="mt-3 text-5xl md:text-6xl font-bold text-gradient">
              {t.brain.title}
            </h1>
            <p className="mt-6 text-muted text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              {t.brain.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a
                href="https://brain.tetardtek.com/ui/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-card font-semibold text-white text-sm transition-opacity hover:opacity-90 bg-gradient-vc"
              >
                {t.brain.cta_demo}
              </a>
              <a
                href="https://brain.tetardtek.com/ui/docs.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-card font-semibold border border-border text-muted text-sm hover:border-purple hover:text-purple transition-colors"
              >
                {t.brain.cta_docs}
              </a>
              <a
                href="https://github.com/Tetardtek/Cortex-Template"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-card font-semibold border border-border text-muted text-sm hover:border-cyan hover:text-cyan transition-colors"
              >
                {t.brain.cta_github}
              </a>
              <Link
                href="/#brain"
                className="px-6 py-3 rounded-card font-semibold border border-border text-muted text-sm hover:border-pink hover:text-pink transition-colors"
              >
                ← {lang === 'fr' ? 'Retour au portfolio' : 'Back to portfolio'}
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features grid */}
        {features.length > 0 && (
          <section className="px-6 max-w-5xl mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  className="glass p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <div className="text-2xl mb-3">{feat.icon}</div>
                  <h3 className="font-mono font-bold text-pink text-sm mb-2">{feat.title[lang]}</h3>
                  <p className="text-muted text-sm leading-relaxed">{feat.desc[lang]}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Timeline */}
        {milestones.length > 0 && (
          <section className="px-6 max-w-3xl mx-auto py-16">
            <motion.h2
              className="text-2xl font-bold text-text text-center mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {lang === 'fr' ? 'Milestones récents' : 'Recent milestones'}
            </motion.h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

              <div className="flex flex-col gap-6">
                {milestones.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 pl-10 relative"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <div
                      className="absolute left-3 top-1.5 w-3 h-3 rounded-full border-2 border-pink"
                      style={{ background: 'var(--surface)' }}
                    />
                    <div>
                      <span className="font-mono text-xs text-cyan">{item.date}</span>
                      <p className="text-text text-sm mt-0.5">{item.label[lang]}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer lang={lang} t={t.footer} />
      <BackToTop />
    </>
  )
}
