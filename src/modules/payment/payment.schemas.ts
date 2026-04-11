import { z } from 'zod'

export const createCheckoutSessionSchema = z.object({
  catalogItemId: z.string().cuid(),
})

export const createBillingPortalSchema = z.object({
  returnUrl: z.string().url().optional(),
})
