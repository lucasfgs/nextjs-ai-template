'use server'

import { AuthError } from 'next-auth'
import { getRequestI18n } from '@/modules/i18n'
import { signIn } from '../auth'
import { getAuthSchemas } from '../schemas/auth.schemas'
import type { ActionState } from '../types/auth.types'

export async function signInAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { locale, messages } = await getRequestI18n()
  const { signInSchema } = getAuthSchemas(locale)
  const parsed = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? messages.validation.invalidInput }
  }

  try {
    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    })

    return { success: messages.auth.actions.signedInSuccessfully }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: messages.auth.actions.invalidEmailOrPassword }
        default:
          return { error: messages.auth.actions.somethingWentWrong }
      }
    }
    throw error
  }
}
