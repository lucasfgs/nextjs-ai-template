'use server'

import { prisma } from '@/lib/prisma'
import { verifyEmailSchema } from '../schemas/auth.schemas'
import type { ActionState } from '../types/auth.types'

export async function verifyEmailAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = verifyEmailSchema.safeParse({
    token: formData.get('token'),
  })

  if (!parsed.success) {
    return { error: 'Invalid token' }
  }

  const { token } = parsed.data

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!verificationToken || verificationToken.type !== 'EMAIL_VERIFICATION') {
    return { error: 'Invalid or expired verification token' }
  }

  if (verificationToken.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } })
    return { error: 'Verification token has expired. Please request a new one.' }
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerified: new Date() },
    }),
    prisma.verificationToken.delete({ where: { token } }),
  ])

  return { success: 'Email verified successfully! You can now sign in.' }
}
