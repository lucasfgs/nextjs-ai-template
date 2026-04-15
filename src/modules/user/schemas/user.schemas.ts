import { z } from 'zod'
import { getMessages, type Locale } from '@/modules/i18n'
import { getValidationSchemas } from '@/lib/validations'

export function getUpdateProfileSchema(locale: Locale = 'en') {
  const messages = getMessages(locale)
  const { nameSchema } = getValidationSchemas(locale)

  return z.object({
    name: nameSchema.optional(),
    image: z.string().url(messages.validation.invalidImageUrl).optional().or(z.literal('')),
  })
}

export const updateProfileSchema = getUpdateProfileSchema()

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
