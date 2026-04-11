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
