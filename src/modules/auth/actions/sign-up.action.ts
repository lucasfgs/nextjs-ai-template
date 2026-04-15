'use server'

import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { getRequestI18n } from '@/modules/i18n'
import { getAuthSchemas } from '../schemas/auth.schemas'
import type { ActionState } from '../types/auth.types'

export async function signUpAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { locale, messages } = await getRequestI18n()
  const { signUpSchema } = getAuthSchemas(locale)
  const parsed = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? messages.validation.invalidInput }
  }

  const { name, email, password } = parsed.data

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return { error: messages.auth.actions.accountAlreadyExists }
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return { success: messages.auth.actions.accountCreated }
}
