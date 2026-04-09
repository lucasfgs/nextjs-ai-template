import { z } from 'zod'
import { nameSchema } from '@/lib/validations'

export const updateProfileSchema = z.object({
  name: nameSchema.optional(),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
