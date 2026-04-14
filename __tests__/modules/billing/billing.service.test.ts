jest.mock('@/env', () => ({
  env: {
    NEXT_PUBLIC_APP_URL: 'https://template.test',
    STRIPE_PREMIUM_PRICE_ID: 'price_premium',
    STRIPE_PRO_PRICE_ID: 'price_pro',
  },
}))

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    subscription: {
      findFirst: jest.fn(),
      upsert: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}))

jest.mock('@/modules/billing/stripe', () => ({
  getStripeClient: jest.fn(),
  getStripePriceId: jest.fn(),
}))

import { prisma } from '@/lib/prisma'
import { billingService } from '@/modules/billing/billing.service'
import { getStripeClient, getStripePriceId } from '@/modules/billing/stripe'

describe('billingService', () => {
  const checkoutCreate = jest.fn()
  const billingPortalCreate = jest.fn()
  const subscriptionsRetrieve = jest.fn()
  const stripeClient = {
    checkout: { sessions: { create: checkoutCreate } },
    billingPortal: { sessions: { create: billingPortalCreate } },
    subscriptions: { retrieve: subscriptionsRetrieve },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(getStripeClient as jest.Mock).mockReturnValue(stripeClient)
    ;(getStripePriceId as jest.Mock).mockReturnValue('price_premium')
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (operations) => operations)
    ;(prisma.user.update as jest.Mock).mockReturnValue('user-update-op')
    ;(prisma.subscription.upsert as jest.Mock).mockReturnValue('subscription-upsert-op')
  })

  it('loads the most recent subscription for a user', async () => {
    await billingService.getUserSubscription('user_1')

    expect(prisma.subscription.findFirst).toHaveBeenCalledWith({
      where: { userId: 'user_1' },
      orderBy: { updatedAt: 'desc' },
    })
  })

  it('throws when a checkout session is requested without a configured price id', async () => {
    ;(getStripePriceId as jest.Mock).mockReturnValueOnce(undefined)

    await expect(billingService.createCheckoutSession('user_1', 'premium')).rejects.toThrow(
      'Missing Stripe price ID for plan: premium',
    )
  })

  it('throws when creating a checkout session for a missing user', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null)

    await expect(billingService.createCheckoutSession('user_1', 'premium')).rejects.toThrow(
      'User not found',
    )
  })

  it('creates a checkout session for a valid user and plan', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({ email: 'jane@example.com' })
    checkoutCreate.mockResolvedValueOnce({ url: 'https://stripe.test/checkout' })

    await expect(billingService.createCheckoutSession('user_1', 'premium')).resolves.toBe(
      'https://stripe.test/checkout',
    )

    expect(checkoutCreate).toHaveBeenCalledWith({
      mode: 'subscription',
      customer_email: 'jane@example.com',
      line_items: [{ price: 'price_premium', quantity: 1 }],
      success_url: 'https://template.test/settings?checkout=success',
      cancel_url: 'https://template.test/settings?checkout=cancelled',
      allow_promotion_codes: true,
      metadata: { userId: 'user_1', plan: 'premium' },
      subscription_data: { metadata: { userId: 'user_1', plan: 'premium' } },
    })
  })

  it('throws when a billing portal session is requested without a Stripe customer', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({ stripeCustomerId: null })

    await expect(billingService.createBillingPortalSession('user_1')).rejects.toThrow(
      'Stripe customer not found',
    )
  })

  it('creates a billing portal session for a Stripe customer', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({ stripeCustomerId: 'cus_123' })
    billingPortalCreate.mockResolvedValueOnce({ url: 'https://stripe.test/portal' })

    await expect(billingService.createBillingPortalSession('user_1')).resolves.toBe(
      'https://stripe.test/portal',
    )

    expect(billingPortalCreate).toHaveBeenCalledWith({
      customer: 'cus_123',
      return_url: 'https://template.test/settings',
    })
  })

  it('ignores checkout completion events that do not include the required identifiers', async () => {
    await billingService.syncCheckoutCompleted({
      customer: null,
      metadata: { userId: 'user_1' },
      subscription: null,
    } as never)

    expect(getStripeClient).not.toHaveBeenCalled()
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  it('syncs completed checkout data into the user and subscription records', async () => {
    subscriptionsRetrieve.mockResolvedValueOnce({
      id: 'sub_123',
      items: {
        data: [
          {
            price: {
              id: 'price_premium',
              product: 'prod_123',
            },
          },
        ],
      },
      status: 'active',
      current_period_start: 10,
      current_period_end: 20,
      cancel_at_period_end: false,
      canceled_at: null,
      trial_start: 5,
      trial_end: 8,
      metadata: { source: 'checkout' },
    })

    await billingService.syncCheckoutCompleted({
      customer: 'cus_123',
      metadata: { userId: 'user_1' },
      subscription: 'sub_123',
    } as never)

    expect(subscriptionsRetrieve).toHaveBeenCalledWith('sub_123', {
      expand: ['items.data.price.product'],
    })
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user_1' },
      data: { stripeCustomerId: 'cus_123' },
    })
    expect(prisma.subscription.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { stripeSubscriptionId: 'sub_123' },
        create: expect.objectContaining({
          userId: 'user_1',
          plan: 'PREMIUM',
          status: 'ACTIVE',
          stripeProductId: 'prod_123',
        }),
        update: expect.objectContaining({
          plan: 'PREMIUM',
          status: 'ACTIVE',
        }),
      }),
    )
    expect(prisma.$transaction).toHaveBeenCalledWith(['user-update-op', 'subscription-upsert-op'])
  })

  it('skips subscription sync when no user id can be resolved', async () => {
    subscriptionsRetrieve.mockResolvedValueOnce({
      id: 'sub_456',
      customer: 'cus_456',
      items: { data: [] },
      status: 'trialing',
      current_period_start: 10,
      current_period_end: 20,
      cancel_at_period_end: false,
      canceled_at: null,
      trial_start: null,
      trial_end: null,
      metadata: {},
    })

    await billingService.syncSubscriptionEvent({
      id: 'sub_456',
      customer: 'cus_456',
      metadata: {},
    } as never)

    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  it('syncs subscription events using the resolved customer and subscription metadata', async () => {
    subscriptionsRetrieve.mockResolvedValueOnce({
      id: 'sub_789',
      customer: 'cus_789',
      items: {
        data: [
          {
            price: {
              id: 'price_pro',
              product: { id: 'prod_789' },
            },
          },
        ],
      },
      status: 'past_due',
      current_period_start: 30,
      current_period_end: 40,
      cancel_at_period_end: true,
      canceled_at: 45,
      trial_start: null,
      trial_end: null,
      metadata: { userId: 'user_9' },
    })

    await billingService.syncSubscriptionEvent({
      id: 'sub_789',
      customer: 'cus_789',
      metadata: { userId: 'user_9' },
    } as never)

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user_9' },
      data: { stripeCustomerId: 'cus_789' },
    })
    expect(prisma.subscription.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({
          plan: 'PRO',
          status: 'PAST_DUE',
          stripeProductId: 'prod_789',
          cancelAtPeriodEnd: true,
        }),
        update: expect.objectContaining({
          plan: 'PRO',
          status: 'PAST_DUE',
          cancelAtPeriodEnd: true,
        }),
      }),
    )
  })

  it('maps trialing subscriptions with missing prices back to the free plan', async () => {
    subscriptionsRetrieve.mockResolvedValueOnce({
      id: 'sub_trial',
      customer: 'cus_trial',
      items: {
        data: [
          {
            price: {
              id: null,
              product: null,
            },
          },
        ],
      },
      status: 'trialing',
      current_period_start: 50,
      current_period_end: 60,
      cancel_at_period_end: false,
      canceled_at: null,
      trial_start: 50,
      trial_end: 60,
      metadata: { userId: 'user_trial' },
    })

    await billingService.syncSubscriptionEvent({
      id: 'sub_trial',
      customer: { id: 'cus_trial' },
      metadata: { userId: 'user_trial' },
    } as never)

    expect(prisma.subscription.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({
          plan: 'FREE',
          status: 'TRIALING',
          stripeProductId: null,
        }),
        update: expect.objectContaining({
          plan: 'FREE',
          status: 'TRIALING',
          stripeProductId: null,
        }),
      }),
    )
  })

  it('maps canceled checkout subscriptions with unknown prices to the free plan', async () => {
    subscriptionsRetrieve.mockResolvedValueOnce({
      id: 'sub_cancel',
      items: {
        data: [
          {
            price: {
              id: 'price_unknown',
              product: { id: 'prod_cancel' },
            },
          },
        ],
      },
      status: 'canceled',
      current_period_start: 70,
      current_period_end: 80,
      cancel_at_period_end: true,
      canceled_at: 81,
      trial_start: null,
      trial_end: null,
      metadata: { source: 'checkout' },
    })

    await billingService.syncCheckoutCompleted({
      customer: { id: 'cus_cancel' },
      metadata: { userId: 'user_cancel' },
      subscription: { id: 'sub_cancel' },
    } as never)

    expect(prisma.subscription.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({
          plan: 'FREE',
          status: 'CANCELED',
          stripeProductId: 'prod_cancel',
        }),
        update: expect.objectContaining({
          plan: 'FREE',
          status: 'CANCELED',
          stripeProductId: 'prod_cancel',
        }),
      }),
    )
  })

  it('falls back to the expanded subscription customer and inactive status when needed', async () => {
    subscriptionsRetrieve.mockResolvedValueOnce({
      id: 'sub_inactive',
      customer: 'cus_from_subscription',
      items: {
        data: [
          {
            price: {
              id: 'price_unknown',
              product: null,
            },
          },
        ],
      },
      status: 'incomplete',
      current_period_start: 90,
      current_period_end: 100,
      cancel_at_period_end: false,
      canceled_at: null,
      trial_start: null,
      trial_end: null,
      metadata: { userId: 'user_inactive' },
    })

    await billingService.syncSubscriptionEvent({
      id: 'sub_inactive',
      customer: {},
      metadata: { userId: 'user_inactive' },
    } as never)

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user_inactive' },
      data: { stripeCustomerId: 'cus_from_subscription' },
    })
    expect(prisma.subscription.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({
          plan: 'FREE',
          status: 'INACTIVE',
        }),
        update: expect.objectContaining({
          plan: 'FREE',
          status: 'INACTIVE',
        }),
      }),
    )
  })

  it('maps unpaid subscriptions to the unpaid status', async () => {
    subscriptionsRetrieve.mockResolvedValueOnce({
      id: 'sub_unpaid',
      customer: 'cus_unpaid',
      items: {
        data: [
          {
            price: {
              id: 'price_pro',
              product: null,
            },
          },
        ],
      },
      status: 'unpaid',
      current_period_start: 110,
      current_period_end: 120,
      cancel_at_period_end: false,
      canceled_at: null,
      trial_start: null,
      trial_end: null,
      metadata: { userId: 'user_unpaid' },
    })

    await billingService.syncSubscriptionEvent({
      id: 'sub_unpaid',
      customer: 'cus_unpaid',
      metadata: { userId: 'user_unpaid' },
    } as never)

    expect(prisma.subscription.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({
          plan: 'PRO',
          status: 'UNPAID',
        }),
        update: expect.objectContaining({
          plan: 'PRO',
          status: 'UNPAID',
        }),
      }),
    )
  })
})
