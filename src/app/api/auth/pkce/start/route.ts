import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { generatePKCE, buildAuthorizeURL } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const provider = req.nextUrl.searchParams.get('provider') ?? 'discord'
  const { verifier, challenge } = generatePKCE()
  const state = crypto.randomUUID()

  const authorizeURL = buildAuthorizeURL(provider, challenge, state)

  // Store verifier + state in HttpOnly cookies (short-lived, used once at callback)
  const response = NextResponse.redirect(authorizeURL)

  const cookieOpts = `HttpOnly; Path=/; Max-Age=600; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
  response.headers.append('Set-Cookie', `pkce_verifier=${verifier}; ${cookieOpts}`)
  response.headers.append('Set-Cookie', `pkce_state=${state}; ${cookieOpts}`)

  return response
}
