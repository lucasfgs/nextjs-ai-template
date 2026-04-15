import { getMessages, type Locale } from '@/modules/i18n'

export function getBillingPlans(locale: Locale) {
  const messages = getMessages(locale)

  return {
    free: {
      id: 'free',
      name: messages.billing.plans.free.name,
      description: messages.billing.plans.free.description,
      features: messages.billing.plans.free.features,
    },
    premium: {
      id: 'premium',
      name: messages.billing.plans.premium.name,
      description: messages.billing.plans.premium.description,
      features: messages.billing.plans.premium.features,
    },
    pro: {
      id: 'pro',
      name: messages.billing.plans.pro.name,
      description: messages.billing.plans.pro.description,
      features: messages.billing.plans.pro.features,
    },
  } as const
}

export const billingPlans = getBillingPlans('en')

export type BillingPlanId = keyof ReturnType<typeof getBillingPlans>
