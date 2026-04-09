import { Resend } from 'resend'
import { env } from '@/env'
import { APP_CONFIG } from '@/lib/constants'
import type { SendEmailOptions, EmailResult } from './types/email.types'

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

const FROM_EMAIL = env.RESEND_FROM_EMAIL ?? 'noreply@example.com'
const APP_NAME = APP_CONFIG.NAME

export const emailService = {
  async send({ to, subject, react }: SendEmailOptions): Promise<EmailResult> {
    if (!resend) {
      console.warn('[EmailService] RESEND_API_KEY not configured. Email not sent:', subject)
      return { error: 'Email service not configured' }
    }

    try {
      const { data, error } = await resend.emails.send({
        from: `${APP_NAME} <${FROM_EMAIL}>`,
        to,
        subject,
        react,
      })

      if (error) return { error: error.message }
      return { id: data?.id }
    } catch (error) {
      console.error('[EmailService] Failed to send email:', error)
      return { error: 'Failed to send email' }
    }
  },
}
