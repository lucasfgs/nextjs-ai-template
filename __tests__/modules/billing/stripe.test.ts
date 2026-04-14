jest.mock('@/env', () => ({
  env: {
    STRIPE_SECRET_KEY: 'sk_test_123',
    STRIPE_PREMIUM_PRICE_ID: 'price_premium',
    STRIPE_PRO_PRICE_ID: 'price_pro',
  },
}))

jest.mock('stripe', () => {
  return jest.fn().mockImplementation((key: string, options: unknown) => ({
    key,
    options,
  }))
})

import Stripe from 'stripe'
import { getStripeClient, getStripePriceId } from '@/modules/billing/stripe'

describe('billing stripe helpers', () => {
  it('creates and reuses a Stripe client', () => {
    const firstClient = getStripeClient()
    const secondClient = getStripeClient()

    expect(Stripe).toHaveBeenCalledTimes(1)
    expect(Stripe).toHaveBeenCalledWith('sk_test_123', { apiVersion: '2025-02-24.acacia' })
    expect(secondClient).toBe(firstClient)
  })

  it('returns the matching configured price id for each plan', () => {
    expect(getStripePriceId('premium')).toBe('price_premium')
    expect(getStripePriceId('pro')).toBe('price_pro')
  })
})
