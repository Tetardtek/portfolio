import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getUserProfile } from '@/lib/auth'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const user = await getUserProfile(token)
  if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  return NextResponse.json({ nickname: user.nickname, email: user.email })
}
