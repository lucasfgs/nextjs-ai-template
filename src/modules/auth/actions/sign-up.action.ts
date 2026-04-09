'use server'

import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signUpSchema } from '../schemas/auth.schemas'
import type { ActionState } from '../types/auth.types'

export async function signUpAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const { name, email, password } = parsed.data

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return { error: 'An account with this email already exists' }
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return { success: 'Account created! Please check your email to verify your account.' }
}
