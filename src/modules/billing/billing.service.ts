import { prisma } from '@/lib/prisma'
import { env } from '@/env'
import { getStripeClient, getStripePriceId } from './stripe'
import type { BillingPlanInput } from './billing.schemas'

export const billingService = {
  async getUserSubscription(userId: string) {
    return prisma.subscription.findFirst({ where: { userId }, orderBy: { updatedAt: 'desc' } })
  },

  async createCheckoutSession(userId: string, plan: BillingPlanInput) {
    const stripe = getStripeClient()
    const priceId = getStripePriceId(plan)
    if (!priceId) throw new Error(`Missing Stripe price ID for plan: ${plan}`)

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error('User not found')

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${env.NEXT_PUBLIC_APP_URL}/settings?checkout=success`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/settings?checkout=cancelled`,
      allow_promotion_codes: true,
      metadata: { userId, plan },
    })

    return session.url
  },

  async createBillingPortalSession(userId: string) {
    const stripe = getStripeClient()
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user?.stripeCustomerId) throw new Error('Stripe customer not found')

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${env.NEXT_PUBLIC_APP_URL}/settings`,
    })

    return session.url
  },
}
