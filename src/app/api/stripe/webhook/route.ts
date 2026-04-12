import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { env } from '@/env'
import { billingService } from '@/modules/billing'
import { getStripeClient } from '@/modules/billing'

export async function POST(req: Request) {
  try {
    const signature = headers().get('stripe-signature')
    if (!signature) return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 })
    if (!env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Webhook secret is not configured' }, { status: 500 })
    }

    const rawBody = await req.text()
    const stripe = getStripeClient()
    const event = stripe.webhooks.constructEvent(rawBody, signature, env.STRIPE_WEBHOOK_SECRET)

    switch (event.type) {
      case 'checkout.session.completed':
        await billingService.syncCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await billingService.syncCheckoutCompleted({
          ...((event.data.object as unknown) as Stripe.Checkout.Session),
        })
        break
      default:
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook handler failed'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
