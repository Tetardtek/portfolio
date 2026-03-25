import { NextResponse } from 'next/server'

// Legacy login route — replaced by PKCE flow via /api/auth/pkce/start
// Kept as redirect to prevent 404 on old bookmarks
export async function POST() {
  return NextResponse.json(
    { error: 'Login via password is deprecated. Use SuperOAuth PKCE flow.' },
    { status: 410 }
  )
}

export async function GET() {
  return NextResponse.redirect(new URL('/admin', process.env.NEXT_PUBLIC_URL ?? 'https://portfolio.tetardtek.com'))
}
