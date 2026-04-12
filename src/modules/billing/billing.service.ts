import { env } from '@/env'
import { prisma } from '@/lib/prisma'
import type { BillingPlanInput } from './billing.schemas'
import { getStripeClient, getStripePriceId } from './stripe'
import type Stripe from 'stripe'

function mapStripeSubscriptionStatus(status: Stripe.Subscription.Status) {
  switch (status) {
    case 'trialing':
      return 'TRIALING'
    case 'active':
      return 'ACTIVE'
    case 'past_due':
      return 'PAST_DUE'
    case 'canceled':
      return 'CANCELED'
    case 'unpaid':
      return 'UNPAID'
    default:
      return 'INACTIVE'
  }
}

function mapPriceIdToPlan(priceId?: string | null) {
  if (!priceId) return 'FREE'
  if (priceId === env.STRIPE_PREMIUM_PRICE_ID) return 'PREMIUM'
  if (priceId === env.STRIPE_PRO_PRICE_ID) return 'PRO'
  return 'FREE'
}

async function syncStripeSubscription(subscription: Stripe.Subscription, userId?: string, customerId?: string | null) {
  const stripe = getStripeClient()
  const expandedSubscription = await stripe.subscriptions.retrieve(subscription.id, {
    expand: ['items.data.price.product'],
  })
  const price = expandedSubscription.items.data[0]?.price
  const resolvedUserId = userId ?? expandedSubscription.metadata?.userId
  if (!resolvedUserId) return

  await prisma.$transaction([
    customerId
      ? prisma.user.update({ where: { id: resolvedUserId }, data: { stripeCustomerId: customerId } })
      : prisma.user.update({
          where: { id: resolvedUserId },
          data: { stripeCustomerId: expandedSubscription.customer as string },
        }),
    prisma.subscription.upsert({
      where: { stripeSubscriptionId: expandedSubscription.id },
      create: {
        userId: resolvedUserId,
        stripeSubscriptionId: expandedSubscription.id,
        stripePriceId: price?.id ?? null,
        stripeProductId:
          typeof price?.product === 'string' ? price.product : price?.product?.id ?? null,
        plan: mapPriceIdToPlan(price?.id),
        status: mapStripeSubscriptionStatus(expandedSubscription.status),
        currentPeriodStart: new Date(expandedSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(expandedSubscription.current_period_end * 1000),
        cancelAtPeriodEnd: expandedSubscription.cancel_at_period_end,
        canceledAt: expandedSubscription.canceled_at ? new Date(expandedSubscription.canceled_at * 1000) : null,
        trialStart: expandedSubscription.trial_start ? new Date(expandedSubscription.trial_start * 1000) : null,
        trialEnd: expandedSubscription.trial_end ? new Date(expandedSubscription.trial_end * 1000) : null,
        metadata: expandedSubscription.metadata,
      },
      update: {
        userId: resolvedUserId,
        stripePriceId: price?.id ?? null,
        stripeProductId:
          typeof price?.product === 'string' ? price.product : price?.product?.id ?? null,
        plan: mapPriceIdToPlan(price?.id),
        status: mapStripeSubscriptionStatus(expandedSubscription.status),
        currentPeriodStart: new Date(expandedSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(expandedSubscription.current_period_end * 1000),
        cancelAtPeriodEnd: expandedSubscription.cancel_at_period_end,
        canceledAt: expandedSubscription.canceled_at ? new Date(expandedSubscription.canceled_at * 1000) : null,
        trialStart: expandedSubscription.trial_start ? new Date(expandedSubscription.trial_start * 1000) : null,
        trialEnd: expandedSubscription.trial_end ? new Date(expandedSubscription.trial_end * 1000) : null,
        metadata: expandedSubscription.metadata,
      },
    }),
  ])
}

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
      subscription_data: { metadata: { userId, plan } },
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

  async syncCheckoutCompleted(session: Stripe.Checkout.Session) {
    const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id
    const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id
    if (!session.metadata?.userId || !customerId || !subscriptionId) return

    const stripe = getStripeClient()
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['items.data.price.product'],
    })

    await prisma.$transaction([
      prisma.user.update({ where: { id: session.metadata.userId }, data: { stripeCustomerId: customerId } }),
      prisma.subscription.upsert({
        where: { stripeSubscriptionId: subscription.id },
        create: {
          userId: session.metadata.userId,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0]?.price.id ?? null,
          stripeProductId:
            typeof subscription.items.data[0]?.price.product === 'string'
              ? subscription.items.data[0].price.product
              : subscription.items.data[0]?.price.product?.id ?? null,
          plan: mapPriceIdToPlan(subscription.items.data[0]?.price.id),
          status: mapStripeSubscriptionStatus(subscription.status),
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
          trialStart: subscription.trial_start ? new Date(subscription.trial_start * 1000) : null,
          trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
          metadata: subscription.metadata,
        },
        update: {
          userId: session.metadata.userId,
          stripePriceId: subscription.items.data[0]?.price.id ?? null,
          stripeProductId:
            typeof subscription.items.data[0]?.price.product === 'string'
              ? subscription.items.data[0].price.product
              : subscription.items.data[0]?.price.product?.id ?? null,
          plan: mapPriceIdToPlan(subscription.items.data[0]?.price.id),
          status: mapStripeSubscriptionStatus(subscription.status),
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
          trialStart: subscription.trial_start ? new Date(subscription.trial_start * 1000) : null,
          trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
          metadata: subscription.metadata,
        },
      }),
    ])
  },

  async syncSubscriptionEvent(subscription: Stripe.Subscription) {
    await syncStripeSubscription(subscription, subscription.metadata?.userId, typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id)
  },
}
