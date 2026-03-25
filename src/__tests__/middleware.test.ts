import { NextRequest } from 'next/server'
import { middleware } from '@/middleware'

function req(path: string, token?: string) {
  const headers: HeadersInit = {}
  if (token) headers['cookie'] = `admin_token=${token}`
  return new NextRequest(`http://localhost${path}`, { headers })
}

function isNext(res: Response) {
  return res.headers.get('x-middleware-next') === '1'
}

function isRedirect(res: Response) {
  return res.status === 307
}

describe('middleware', () => {
  describe('routes publiques — laisse passer sans vérification', () => {
    it('laisse passer /', () => {
      expect(isNext(middleware(req('/')))).toBe(true)
    })

    it('laisse passer /contact', () => {
      expect(isNext(middleware(req('/contact')))).toBe(true)
    })

    it('laisse passer /admin (page de login)', () => {
      expect(isNext(middleware(req('/admin')))).toBe(true)
    })
  })

  describe('routes protégées — sans cookie', () => {
    it('redirige /admin/dashboard sans token', () => {
      const res = middleware(req('/admin/dashboard'))
      expect(isRedirect(res)).toBe(true)
      expect(res.headers.get('location')).toBe('http://localhost/admin')
    })

    it('redirige /api/admin/projects sans token', () => {
      expect(isRedirect(middleware(req('/api/admin/projects')))).toBe(true)
    })

    it('redirige les sous-routes de /admin/dashboard', () => {
      expect(isRedirect(middleware(req('/admin/dashboard/settings')))).toBe(true)
    })
  })

  describe('routes protégées — avec cookie', () => {
    it('laisse passer /admin/dashboard avec token présent', () => {
      expect(isNext(middleware(req('/admin/dashboard', 'some_token')))).toBe(true)
    })

    it('laisse passer /api/admin/projects avec token présent', () => {
      expect(isNext(middleware(req('/api/admin/projects', 'some_token')))).toBe(true)
    })
  })
})
