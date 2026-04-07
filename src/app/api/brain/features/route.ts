import { NextResponse } from 'next/server'
import { getBrainFeatures } from '@/lib/data'

export async function GET() {
  return NextResponse.json(await getBrainFeatures())
}
