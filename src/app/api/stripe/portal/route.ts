import { NextResponse } from 'next/server'
import { auth } from '@/modules/auth'
import { billingService } from '@/modules/billing'

export async function POST() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const url = await billingService.createBillingPortalSession(session.user.id)
    return NextResponse.json({ url })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create billing portal session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
