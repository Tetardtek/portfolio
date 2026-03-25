import { NextRequest } from 'next/server'
import { POST } from '@/app/api/auth/login/route'

function req(body: object) {
  return new NextRequest('http://localhost/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/auth/login (deprecated)', () => {
  it('retourne 410 Gone — login par password est obsolète', async () => {
    const res = await POST(req({ password: 'anything' }))
    expect(res.status).toBe(410)
    const body = await res.json()
    expect(body.error).toContain('deprecated')
  })
})
