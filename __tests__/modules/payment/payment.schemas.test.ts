import {
  createBillingPortalSchema,
  createCatalogItemSchema,
  createCheckoutSessionSchema,
} from '@/modules/payment/payment.schemas'

describe('createCheckoutSessionSchema', () => {
  it('accepts valid catalog item ids', () => {
    expect(
      createCheckoutSessionSchema.safeParse({ catalogItemId: 'ckh6j8r2a0000z6p4m4r7x1y2' }).success,
    ).toBe(true)
  })

  it('rejects invalid catalog item ids', () => {
    expect(createCheckoutSessionSchema.safeParse({ catalogItemId: 'not-a-cuid' }).success).toBe(
      false,
    )
  })
})

describe('createBillingPortalSchema', () => {
  it('accepts a valid return url', () => {
    expect(
      createBillingPortalSchema.safeParse({ returnUrl: 'https://example.com/settings' }).success,
    ).toBe(true)
  })

  it('allows an empty payload', () => {
    expect(createBillingPortalSchema.safeParse({}).success).toBe(true)
  })
})

describe('createCatalogItemSchema', () => {
  it('applies defaults for active and currency', () => {
    expect(
      createCatalogItemSchema.parse({
        name: 'Starter',
        type: 'ONE_TIME',
        unitAmount: 499,
      }),
    ).toMatchObject({
      active: true,
      currency: 'usd',
    })
  })

  it('accepts subscription metadata when provided', () => {
    expect(
      createCatalogItemSchema.safeParse({
        name: 'Pro',
        description: '  Monthly plan  ',
        type: 'SUBSCRIPTION',
        unitAmount: 1999,
        recurringInterval: 'month',
        recurringIntervalCount: 1,
      }).success,
    ).toBe(true)
  })

  it('rejects non-positive unit amounts', () => {
    expect(
      createCatalogItemSchema.safeParse({
        name: 'Broken',
        type: 'ONE_TIME',
        unitAmount: 0,
      }).success,
    ).toBe(false)
  })
})
