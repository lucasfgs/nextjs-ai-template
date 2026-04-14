import type { Metadata } from 'next'
import { getPageMetadata } from '@/config/page-metadata'
import { getRequestI18n, getRequestLocale } from '@/modules/i18n'
import { ForgotPasswordForm } from '@/modules/auth'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return getPageMetadata(locale).forgotPassword
}

export default async function ForgotPasswordPage() {
  const { messages } = await getRequestI18n()

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">{messages.auth.pages.forgotPassword.title}</h2>
      <p className="text-muted-foreground text-sm">
        {messages.auth.pages.forgotPassword.description}
      </p>
      <div className="pt-2">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
