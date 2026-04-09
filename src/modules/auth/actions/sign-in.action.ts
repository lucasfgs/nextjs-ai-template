'use server'

import { AuthError } from 'next-auth'
import { signIn } from '../auth'
import { signInSchema } from '../schemas/auth.schemas'
import type { ActionState } from '../types/auth.types'

export async function signInAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  try {
    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    })

    return { success: 'Signed in successfully' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password' }
        default:
          return { error: 'Something went wrong. Please try again.' }
      }
    }
    throw error
  }
}
