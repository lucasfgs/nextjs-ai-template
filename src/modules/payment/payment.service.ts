import Stripe from 'stripe'
import { env } from '@/env'

let stripeClient: Stripe | null = null

export function getStripeClient() {
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }

  if (!stripeClient) {
    stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-07-30.basil',
    })
  }

  return stripeClient
}

export function getAppUrl(path = '') {
  const baseUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')
  return path ? `${baseUrl}${path.startsWith('/') ? path : `/${path}`}` : baseUrl
}
