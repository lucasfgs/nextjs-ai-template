'use server'

import crypto from 'crypto'
import { TOKEN_EXPIRY } from '@/lib/constants'
import { prisma } from '@/lib/prisma'
import { getLocalizedPathname, getRequestI18n } from '@/modules/i18n'
import { emailService, ResetPasswordTemplate } from '@/modules/email'
import { ROUTES } from '@/lib/constants'
import { getAuthSchemas } from '../schemas/auth.schemas'
import type { ActionState } from '../types/auth.types'

export async function forgotPasswordAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { locale, messages } = await getRequestI18n()
  const { forgotPasswordSchema } = getAuthSchemas(locale)
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? messages.validation.invalidInput }
  }

  const { email } = parsed.data

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { success: messages.auth.actions.ifAccountExists }
  }

  await prisma.verificationToken.deleteMany({
    where: { userId: user.id, type: 'PASSWORD_RESET' },
  })

  const token = crypto.randomBytes(32).toString('hex')

  await prisma.verificationToken.create({
    data: {
      token,
      userId: user.id,
      type: 'PASSWORD_RESET',
      expires: new Date(Date.now() + TOKEN_EXPIRY.PASSWORD_RESET),
    },
  })

  const emailResult = await emailService.send({
    to: email,
    subject: messages.auth.actions.resetPasswordEmailSubject,
    react: ResetPasswordTemplate({
      locale,
      name: user.name ?? undefined,
      resetPath: `${getLocalizedPathname(locale, ROUTES.RESET_PASSWORD)}?token=${token}`,
    }),
  })

  if (emailResult.error) {
    return { error: messages.auth.actions.emailSendFailed }
  }

  return { success: messages.auth.actions.ifAccountExists }
}
