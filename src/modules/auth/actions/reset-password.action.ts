'use server'

import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { resetPasswordSchema } from '../schemas/auth.schemas'
import type { ActionState } from '../types/auth.types'

export async function resetPasswordAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get('token'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const { token, password } = parsed.data

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!verificationToken || verificationToken.type !== 'PASSWORD_RESET') {
    return { error: 'Invalid or expired reset token' }
  }

  if (verificationToken.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } })
    return { error: 'Reset token has expired. Please request a new one.' }
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.$transaction([
    prisma.user.update({
      where: { id: verificationToken.userId },
      data: { password: hashedPassword },
    }),
    prisma.verificationToken.delete({ where: { token } }),
    // Invalidate all sessions
    prisma.session.deleteMany({ where: { userId: verificationToken.userId } }),
  ])

  return { success: 'Password reset successfully. You can now sign in.' }
}
