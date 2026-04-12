import { NextResponse } from 'next/server'
import { auth } from '@/modules/auth'
import { billingService } from '@/modules/billing'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const url = await billingService.createCheckoutSession(session.user.id, body.plan)
  return NextResponse.json({ url })
}
