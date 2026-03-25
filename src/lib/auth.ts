import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const PUBLIC_URL = process.env.PUBLIC_URL ?? 'https://portfolio.tetardtek.com'

/** Resolve the public base URL — uses X-Forwarded-Host if behind a proxy, else env */
export function getPublicUrl(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-host')
  const proto = req.headers.get('x-forwarded-proto') ?? 'https'
  if (forwarded) return `${proto}://${forwarded}`
  return PUBLIC_URL
}

const SUPEROAUTH_URL = process.env.SUPEROAUTH_URL ?? 'https://superoauth.tetardtek.com'
const CLIENT_ID = process.env.SUPEROAUTH_CLIENT_ID ?? ''
const OWNER_USER_ID = process.env.OWNER_USER_ID ?? ''
const REDIRECT_URI = process.env.SUPEROAUTH_REDIRECT_URI ?? ''
const COOKIE_NAME = 'admin_token'
const COOKIE_MAX_AGE = 60 * 60 * 8 // 8 hours

// ─── PKCE helpers ────────────────────────────────────────────

export function generatePKCE() {
  const verifier = crypto.randomBytes(32).toString('hex') // 64 chars
  const challenge = crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64url')
  return { verifier, challenge }
}

export function buildAuthorizeURL(provider: string, codeChallenge: string, state: string): string {
  const url = new URL(`${SUPEROAUTH_URL}/oauth/authorize`)
  url.searchParams.set('client_id', CLIENT_ID)
  url.searchParams.set('redirect_uri', REDIRECT_URI)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('code_challenge', codeChallenge)
  url.searchParams.set('code_challenge_method', 'S256')
  url.searchParams.set('provider', provider)
  url.searchParams.set('state', state)
  return url.toString()
}

export async function exchangeCode(code: string, codeVerifier: string): Promise<{ access_token: string; refresh_token: string } | null> {
  const res = await fetch(`${SUPEROAUTH_URL}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
      client_id: CLIENT_ID,
    }).toString(),
  })

  if (!res.ok) return null
  return res.json()
}

export async function getUserProfile(accessToken: string): Promise<{ id: string; email: string; nickname: string } | null> {
  const res = await fetch(`${SUPEROAUTH_URL}/api/v1/user/profile`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) return null
  const data = await res.json()
  return data?.data?.user ?? null
}

// ─── Session ─────────────────────────────────────────────────

export function buildAuthCookie(accessToken: string): string {
  return `${COOKIE_NAME}=${accessToken}; HttpOnly; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
}

export function buildLogoutCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`
}

export async function getAdminSession(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null

  // Validate token against SuperOAuth
  const user = await getUserProfile(token)
  if (!user) return null

  // Owner check
  if (user.id !== OWNER_USER_ID) return null

  return { userId: user.id }
}

export async function guard(): Promise<NextResponse | null> {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return null
}

export function isOwner(userId: string): boolean {
  return userId === OWNER_USER_ID
}
