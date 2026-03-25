import { NextRequest, NextResponse } from 'next/server'
import { exchangeCode, getUserProfile, isOwner, buildAuthCookie } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')
  const error = req.nextUrl.searchParams.get('error')

  if (error) {
    return NextResponse.redirect(new URL('/admin?error=provider_denied', req.url))
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL('/admin?error=missing_params', req.url))
  }

  // Retrieve PKCE verifier and state from cookies
  const verifier = req.cookies.get('pkce_verifier')?.value
  const storedState = req.cookies.get('pkce_state')?.value

  if (!verifier || !storedState) {
    return NextResponse.redirect(new URL('/admin?error=expired_session', req.url))
  }

  // CSRF check
  if (state !== storedState) {
    return NextResponse.redirect(new URL('/admin?error=invalid_state', req.url))
  }

  // Exchange code for tokens
  const tokens = await exchangeCode(code, verifier)
  if (!tokens) {
    return NextResponse.redirect(new URL('/admin?error=token_exchange_failed', req.url))
  }

  // Verify user is the owner
  const user = await getUserProfile(tokens.access_token)
  if (!user || !isOwner(user.id)) {
    return NextResponse.redirect(new URL('/admin?error=unauthorized', req.url))
  }

  // Set session cookie and clear PKCE cookies
  const response = NextResponse.redirect(new URL('/admin/dashboard', req.url))
  response.headers.append('Set-Cookie', buildAuthCookie(tokens.access_token))
  response.headers.append('Set-Cookie', 'pkce_verifier=; HttpOnly; Path=/; Max-Age=0')
  response.headers.append('Set-Cookie', 'pkce_state=; HttpOnly; Path=/; Max-Age=0')

  return response
}
