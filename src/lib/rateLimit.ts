/**
 * Rate limiter in-memory basé sur l'IP.
 * Adapté à un déploiement single-instance (VPS).
 * Ne persiste pas entre redémarrages du serveur — suffisant pour un portfolio.
 */

interface Entry {
  count: number
  resetAt: number
}

const store = new Map<string, Entry>()

interface RateLimitOptions {
  /** Fenêtre de temps en millisecondes */
  windowMs: number
  /** Nombre maximum de requêtes autorisées par fenêtre */
  max: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

export function rateLimit(ip: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    // Première requête ou fenêtre expirée : on repart à zéro
    store.set(ip, { count: 1, resetAt: now + options.windowMs })
    return { allowed: true, remaining: options.max - 1, resetAt: now + options.windowMs }
  }

  if (entry.count >= options.max) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: options.max - entry.count, resetAt: entry.resetAt }
}
