import { z } from 'zod'

export const billingPlanSchema = z.enum(['free', 'premium', 'pro'])

export const createCheckoutSessionSchema = z.object({
  plan: billingPlanSchema.exclude(['free']),
})

export const billingPortalSchema = z.object({})

export const stripeWebhookEventSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.object({
    object: z.record(z.any()),
  }),
})

export type BillingPlanInput = z.infer<typeof createCheckoutSessionSchema>['plan']
