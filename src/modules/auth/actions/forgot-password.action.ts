'use server'

import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { TOKEN_EXPIRY } from '@/lib/constants'
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

  // Always return success to prevent email enumeration
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { success: 'If an account exists, a reset link has been sent.' }
  }

  // Invalidate existing tokens
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

  // TODO: Send email via email module
  // await sendPasswordResetEmail({ email, token })

  return { success: 'If an account exists, a reset link has been sent.' }
}
