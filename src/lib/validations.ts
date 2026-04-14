import { z } from 'zod'
import { getMessages, type Locale } from '@/modules/i18n'

export function getValidationSchemas(locale: Locale = 'en') {
  const messages = getMessages(locale)

  return {
    emailSchema: z.string().email(messages.validation.invalidEmailAddress),
    passwordSchema: z
      .string()
      .min(8, messages.validation.passwordMinLength)
      .max(100, messages.validation.passwordMaxLength)
      .regex(/[A-Z]/, messages.validation.passwordUppercase)
      .regex(/[0-9]/, messages.validation.passwordNumber),
    nameSchema: z
      .string()
      .min(2, messages.validation.nameMinLength)
      .max(100, messages.validation.nameMaxLength)
      .trim(),
  }
}

export const { emailSchema, passwordSchema, nameSchema } = getValidationSchemas()
