'use server'

import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { getRequestI18n } from '@/modules/i18n'
import { getAuthSchemas } from '../schemas/auth.schemas'
import type { ActionState } from '../types/auth.types'

export async function resetPasswordAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { locale, messages } = await getRequestI18n()
  const { resetPasswordSchema } = getAuthSchemas(locale)
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get('token'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? messages.validation.invalidInput }
  }

  const { token, password } = parsed.data

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!verificationToken || verificationToken.type !== 'PASSWORD_RESET') {
    return { error: messages.auth.actions.invalidOrExpiredResetToken }
  }

  if (verificationToken.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } })
    return { error: messages.auth.actions.resetTokenExpired }
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

  return { success: messages.auth.actions.passwordResetSuccessfully }
}
