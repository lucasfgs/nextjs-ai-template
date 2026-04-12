export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'canceled'

export type BillingCatalogType = 'ONE_TIME' | 'SUBSCRIPTION'

export type SubscriptionStatusType =
  | 'incomplete'
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'unpaid'

export type StripeCheckoutMode = 'payment' | 'subscription'

export type BillingCatalogItem = {
  id: string
  name: string
  description: string | null
  type: BillingCatalogType
  active: boolean
  stripeProductId: string | null
  stripePriceId: string | null
  currency: string
  unitAmount: number
  recurringInterval: string | null
  recurringIntervalCount: number | null
}
