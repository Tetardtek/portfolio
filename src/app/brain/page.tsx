'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { BackToTop } from '@/components/ui/BackToTop'
import type { Lang } from '@/types'
import fr from '@/i18n/fr.json'
import en from '@/i18n/en.json'

const translations = { fr, en }

const FEATURES = [
  {
    icon: '🧠',
    title: { fr: 'Agents spécialisés', en: 'Specialized agents' },
    desc: {
      fr: '81+ agents avec détection automatique par domaine — sécurité, DevOps, debug, game design, refacto. Chaque agent connaît son périmètre et ses règles.',
      en: '81+ agents with automatic domain detection — security, DevOps, debug, game design, refactoring. Each agent knows its scope and rules.'
    },
  },
  {
    icon: '🔒',
    title: { fr: 'Zones protégées', en: 'Protected zones' },
    desc: {
      fr: '5 zones typées (kernel, project, personal, reference, satellite) avec protection graduée. Le kernel ne dérive jamais — flux unidirectionnel.',
      en: '5 typed zones (kernel, project, personal, reference, satellite) with graduated protection. The kernel never drifts — unidirectional flow.'
    },
  },
  {
    icon: '⚡',
    title: { fr: 'Boot intelligent', en: 'Smart boot' },
    desc: {
      fr: 'BHP (Brain Hot Path) — chargement chirurgical par manifests. Briefing factuel en 15 lignes, détection automatique du type de session.',
      en: 'BHP (Brain Hot Path) — surgical context loading via manifests. Factual briefing in 15 lines, automatic session type detection.'
    },
  },
  {
    icon: '🗄️',
    title: { fr: 'Persistance Dolt', en: 'Dolt persistence' },
    desc: {
      fr: 'Base de données versionnée avec Dolt — chaque session est traçable, chaque décision est auditable. Git pour les données.',
      en: 'Versioned database with Dolt — every session is traceable, every decision is auditable. Git for data.'
    },
  },
  {
    icon: '🌐',
    title: { fr: 'Distribution open-core', en: 'Open-core distribution' },
    desc: {
      fr: 'Template distribué sous BSL 1.1 — kernel ouvert, distillation privée. Pipeline E2E validé sur 4 environnements.',
      en: 'Template distributed under BSL 1.1 — open kernel, private distillation. E2E pipeline validated on 5 environments.'
    },
  },
  {
    icon: '🔍',
    title: { fr: 'Recherche sémantique', en: 'Semantic search' },
    desc: {
      fr: 'RAG local via Ollama + nomic-embed-text — 1300+ chunks indexés. Retrouve du contexte sans savoir dans quel fichier chercher.',
      en: 'Local RAG via Ollama + nomic-embed-text — 1300+ indexed chunks. Find context without knowing which file to look in.'
    },
  },
]

const TIMELINE = [
  { date: '2026-03', label: { fr: 'Dolt migration complète — persistance cognitive versionnée', en: 'Full Dolt migration — versioned cognitive persistence' } },
  { date: '2026-03', label: { fr: 'Première PR mergée — pipeline open-source validé', en: 'First PR merged — open-source pipeline validated' } },
  { date: '2026-03', label: { fr: 'brain-ui LIVE + Cosmos LIVE', en: 'brain-ui LIVE + Cosmos LIVE' } },
  { date: '2026-03', label: { fr: 'MCP local + 81 agents catalogués', en: 'Local MCP + 81 agents catalogued' } },
  { date: '2026-03', label: { fr: 'Template RC — docs, setup zero-friction', en: 'Template RC — docs, zero-friction setup' } },
  { date: '2026-03', label: { fr: 'BSL 1.1 — licence publiée, Apache 2.0 en 2028', en: 'BSL 1.1 — license published, Apache 2.0 in 2028' } },
]

export default function BrainPage() {
  const [lang, setLang] = useState<Lang>('fr')
  const t = translations[lang]

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
        <section className="px-6 max-w-5xl mx-auto py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
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

        {/* Timeline */}
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
              {TIMELINE.map((item, i) => (
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
      </main>

      <Footer lang={lang} t={t.footer} />
      <BackToTop />
    </>
  )
}
