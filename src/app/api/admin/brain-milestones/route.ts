import { NextRequest, NextResponse } from 'next/server'
import { guard } from '@/lib/auth'
import { getBrainMilestones, saveBrainMilestones } from '@/lib/data'
import { BrainMilestonesSchema } from '@/lib/schemas'

export async function GET() {
  const denied = await guard()
  if (denied) return denied
  return NextResponse.json(await getBrainMilestones())
}

export async function PUT(req: NextRequest) {
  const denied = await guard()
  if (denied) return denied

  const body = await req.json()
  const result = BrainMilestonesSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Données invalides', details: result.error.flatten() }, { status: 400 })
  }

  await saveBrainMilestones(result.data)
  return NextResponse.json({ ok: true })
}
