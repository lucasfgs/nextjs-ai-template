import Stripe from 'stripe'
import { env } from '@/env'

let stripeClient: Stripe | null = null

export function getStripeClient() {
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  if (!stripeClient) {
    stripeClient = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2025-07-30.basil' })
  }
  return stripeClient
}

export function getStripePriceId(plan: 'premium' | 'pro') {
  return plan === 'premium' ? env.STRIPE_PREMIUM_PRICE_ID : env.STRIPE_PRO_PRICE_ID
}
