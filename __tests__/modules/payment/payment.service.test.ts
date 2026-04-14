jest.mock('@/env', () => ({
  env: {
    STRIPE_SECRET_KEY: 'sk_test_456',
    NEXT_PUBLIC_APP_URL: 'https://template.test/',
  },
}))

jest.mock('stripe', () => {
  return jest.fn().mockImplementation((key: string, options: unknown) => ({
    key,
    options,
  }))
})

import Stripe from 'stripe'
import { getAppUrl, getStripeClient } from '@/modules/payment/payment.service'

describe('payment service helpers', () => {
  it('creates and reuses a Stripe client', () => {
    const firstClient = getStripeClient()
    const secondClient = getStripeClient()

    expect(Stripe).toHaveBeenCalledTimes(1)
    expect(Stripe).toHaveBeenCalledWith('sk_test_456', { apiVersion: '2025-02-24.acacia' })
    expect(secondClient).toBe(firstClient)
  })

  it('joins app paths without duplicating slashes', () => {
    expect(getAppUrl()).toBe('https://template.test')
    expect(getAppUrl('/settings')).toBe('https://template.test/settings')
    expect(getAppUrl('billing')).toBe('https://template.test/billing')
  })
})
