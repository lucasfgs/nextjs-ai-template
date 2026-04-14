import { z } from 'zod'
import { getMessages, type Locale } from '@/modules/i18n'
import { getValidationSchemas } from '@/lib/validations'

export function getAuthSchemas(locale: Locale = 'en') {
  const messages = getMessages(locale)
  const { emailSchema, passwordSchema, nameSchema } = getValidationSchemas(locale)

  const signInSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, messages.validation.passwordRequired),
  })

  const signUpSchema = z
    .object({
      name: nameSchema,
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: messages.validation.passwordsDoNotMatch,
      path: ['confirmPassword'],
    })

  const forgotPasswordSchema = z.object({
    email: emailSchema,
  })

  const resetPasswordSchema = z
    .object({
      token: z.string().min(1),
      password: passwordSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: messages.validation.passwordsDoNotMatch,
      path: ['confirmPassword'],
    })

  const verifyEmailSchema = z.object({
    token: z.string().min(1),
  })

  return {
    signInSchema,
    signUpSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    verifyEmailSchema,
  }
}

export const {
  signInSchema,
  signUpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} = getAuthSchemas()

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>
