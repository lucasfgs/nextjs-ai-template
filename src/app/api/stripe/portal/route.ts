import { NextResponse } from 'next/server'
import { auth } from '@/modules/auth'
import { billingService } from '@/modules/billing'

export async function POST() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const url = await billingService.createBillingPortalSession(session.user.id)
  return NextResponse.json({ url })
}
