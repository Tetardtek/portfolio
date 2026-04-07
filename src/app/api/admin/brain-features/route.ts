import { NextRequest, NextResponse } from 'next/server'
import { guard } from '@/lib/auth'
import { getBrainFeatures, saveBrainFeatures } from '@/lib/data'
import { BrainFeaturesSchema } from '@/lib/schemas'

export async function GET() {
  const denied = await guard()
  if (denied) return denied
  return NextResponse.json(await getBrainFeatures())
}

export async function PUT(req: NextRequest) {
  const denied = await guard()
  if (denied) return denied

  const body = await req.json()
  const result = BrainFeaturesSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Données invalides', details: result.error.flatten() }, { status: 400 })
  }

  await saveBrainFeatures(result.data)
  return NextResponse.json({ ok: true })
}
