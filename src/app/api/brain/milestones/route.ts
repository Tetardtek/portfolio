import { NextResponse } from 'next/server'
import { getBrainMilestones } from '@/lib/data'

export async function GET() {
  return NextResponse.json(await getBrainMilestones())
}
