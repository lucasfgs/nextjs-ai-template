import { NextResponse } from 'next/server'
import { auth } from '@/modules/auth'
import { billingService, createCheckoutSessionSchema } from '@/modules/billing'

async function readCheckoutPayload(req: Request) {
  const contentType = req.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    return req.json().catch(() => null)
  }

  const formData = await req.formData().catch(() => null)
  if (!formData) return null
  return Object.fromEntries(formData.entries())
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await readCheckoutPayload(req)
    const parsed = createCheckoutSessionSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid checkout request', issues: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const url = await billingService.createCheckoutSession(session.user.id, parsed.data.plan)
    if (!url) return NextResponse.json({ error: 'Unable to create checkout session' }, { status: 500 })

    return NextResponse.redirect(url, { status: 303 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create checkout session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
