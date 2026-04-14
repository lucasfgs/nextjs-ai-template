import { billingPlans } from '@/modules/billing/billing.constants'

describe('billingPlans', () => {
  it('defines the free, premium, and pro plans', () => {
    expect(Object.keys(billingPlans)).toEqual(['free', 'premium', 'pro'])
  })

  it('includes the expected premium and pro features', () => {
    expect(billingPlans.premium.features).toContain('Advanced workflows')
    expect(billingPlans.pro.features).toContain('Billing portal access')
  })
})
