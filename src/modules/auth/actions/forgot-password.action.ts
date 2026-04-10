'use server'

import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { TOKEN_EXPIRY, ROUTES } from '@/lib/constants'
import { emailService, ResetPasswordTemplate } from '@/modules/email'
import { forgotPasswordSchema } from '../schemas/auth.schemas'
import type { ActionState } from '../types/auth.types'

export async function forgotPasswordAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const { email } = parsed.data

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { success: 'If an account exists, a reset link has been sent.' }
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
    subject: 'Reset your password',
    react: ResetPasswordTemplate({ name: user.name ?? undefined, token }),
  })

  if (emailResult.error) {
    return { error: emailResult.error }
  }

  return { success: 'If an account exists, a reset link has been sent.' }
}
