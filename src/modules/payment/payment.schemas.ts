import { z } from 'zod'

export const createCheckoutSessionSchema = z.object({
  catalogItemId: z.string().cuid(),
})

export const createBillingPortalSchema = z.object({
  returnUrl: z.string().url().optional(),
})

export const createCatalogItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().trim().max(500).optional(),
  type: z.enum(['ONE_TIME', 'SUBSCRIPTION']),
  active: z.boolean().default(true),
  currency: z.string().min(3).max(3).default('usd'),
  unitAmount: z.number().int().positive(),
  recurringInterval: z.enum(['day', 'week', 'month', 'year']).optional(),
  recurringIntervalCount: z.number().int().positive().optional(),
})
