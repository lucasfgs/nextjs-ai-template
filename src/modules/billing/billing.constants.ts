export const billingPlans = {
  free: {
    id: 'free',
    name: 'Free',
    description: 'Start with the free plan and upgrade anytime.',
    features: ['Core app access', 'Email support'],
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    description: 'Unlock premium capabilities for growing teams.',
    features: ['Priority support', 'Advanced workflows', 'Premium features'],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    description: 'Best for power users who need the full experience.',
    features: ['Everything in Premium', 'Pro features', 'Billing portal access'],
  },
} as const

export type BillingPlanId = keyof typeof billingPlans
