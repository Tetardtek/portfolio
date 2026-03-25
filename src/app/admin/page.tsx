'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Suspense } from 'react'

const PROVIDERS = [
  { id: 'discord', label: 'Discord', color: '#5865F2' },
  { id: 'github', label: 'GitHub', color: '#333' },
  { id: 'google', label: 'Google', color: '#4285F4' },
  { id: 'twitch', label: 'Twitch', color: '#9146FF' },
]

const ERROR_MESSAGES: Record<string, string> = {
  provider_denied: 'Connexion refusée par le provider.',
  missing_params: 'Paramètres manquants — réessayez.',
  expired_session: 'Session expirée — réessayez.',
  invalid_state: 'Erreur de validation CSRF.',
  token_exchange_failed: 'Échec de l\'échange de token.',
  unauthorized: 'Accès réservé au propriétaire.',
}

function LoginContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg-base)' }}>
      <motion.div
        className="glass p-8 w-full max-w-sm"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-mono text-pink text-xl font-bold mb-2 text-center">~/admin</h1>
        <p className="font-mono text-xs text-muted text-center mb-6">
          Connexion via SuperOAuth
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-btn border border-danger/30 bg-danger/5">
            <p className="text-danger font-mono text-xs text-center">
              {ERROR_MESSAGES[error] ?? 'Erreur inconnue.'}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {PROVIDERS.map((provider) => (
            <motion.a
              key={provider.id}
              href={`/api/auth/pkce/start?provider=${provider.id}`}
              className="w-full py-3 rounded-btn font-semibold text-sm text-white text-center transition-opacity hover:opacity-90"
              style={{ background: provider.color }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Se connecter avec {provider.label}
            </motion.a>
          ))}
        </div>

        <p className="font-mono text-xs text-muted text-center mt-6">
          Accès réservé au propriétaire du portfolio.
        </p>
      </motion.div>
    </div>
  )
}

export default function AdminLogin() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <p className="font-mono text-muted text-sm">Chargement...</p>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
