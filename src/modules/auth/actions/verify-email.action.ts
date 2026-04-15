'use server'

import { prisma } from '@/lib/prisma'
import { getRequestI18n } from '@/modules/i18n'
import { getAuthSchemas } from '../schemas/auth.schemas'
import type { ActionState } from '../types/auth.types'

export async function verifyEmailAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { locale, messages } = await getRequestI18n()
  const { verifyEmailSchema } = getAuthSchemas(locale)
  const parsed = verifyEmailSchema.safeParse({
    token: formData.get('token'),
  })

  if (!parsed.success) {
    return { error: messages.validation.invalidToken }
  }

  const { token } = parsed.data

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!verificationToken || verificationToken.type !== 'EMAIL_VERIFICATION') {
    return { error: messages.auth.actions.invalidOrExpiredVerificationToken }
  }

  if (verificationToken.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } })
    return { error: messages.auth.actions.verificationTokenExpired }
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerified: new Date() },
    }),
    prisma.verificationToken.delete({ where: { token } }),
  ])

  return { success: messages.auth.actions.emailVerifiedSuccessfully }
}
