import { NextResponse } from 'next/server'
import { auth } from '@/modules/auth'
import { billingService, createCheckoutSessionSchema } from '@/modules/billing'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json().catch(() => null)
    const parsed = createCheckoutSessionSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid checkout request', issues: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const url = await billingService.createCheckoutSession(session.user.id, parsed.data.plan)
    return NextResponse.json({ url })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create checkout session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
