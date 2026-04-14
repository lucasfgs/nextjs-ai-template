import {
  billingPlanSchema,
  createCheckoutSessionSchema,
  stripeWebhookEventSchema,
} from '@/modules/billing/billing.schemas'

describe('billingPlanSchema', () => {
  it('accepts supported billing plans', () => {
    expect(billingPlanSchema.safeParse('free').success).toBe(true)
    expect(billingPlanSchema.safeParse('premium').success).toBe(true)
    expect(billingPlanSchema.safeParse('pro').success).toBe(true)
  })

  it('rejects unsupported plan ids', () => {
    expect(billingPlanSchema.safeParse('enterprise').success).toBe(false)
  })
})

describe('createCheckoutSessionSchema', () => {
  it('accepts paid plans', () => {
    expect(createCheckoutSessionSchema.safeParse({ plan: 'premium' }).success).toBe(true)
    expect(createCheckoutSessionSchema.safeParse({ plan: 'pro' }).success).toBe(true)
  })

  it('rejects the free plan', () => {
    expect(createCheckoutSessionSchema.safeParse({ plan: 'free' }).success).toBe(false)
  })
})

describe('stripeWebhookEventSchema', () => {
  it('accepts webhook events with a data object payload', () => {
    expect(
      stripeWebhookEventSchema.safeParse({
        id: 'evt_123',
        type: 'customer.subscription.updated',
        data: { object: { subscription: 'sub_123' } },
      }).success,
    ).toBe(true)
  })

  it('rejects events without the required fields', () => {
    expect(
      stripeWebhookEventSchema.safeParse({
        type: 'customer.subscription.updated',
        data: {},
      }).success,
    ).toBe(false)
  })
})
