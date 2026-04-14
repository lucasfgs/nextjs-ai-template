import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPageMetadata } from '@/config/page-metadata'
import { ROUTES } from '@/lib/constants'
import { getLocalizedPathname, getRequestI18n, getRequestLocale } from '@/modules/i18n'
import { ResetPasswordForm } from '@/modules/auth'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return getPageMetadata(locale).resetPassword
}

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const [resolvedSearchParams, { locale, messages }] = await Promise.all([
    searchParams,
    getRequestI18n(),
  ])
  const token = resolvedSearchParams.token

  if (!token) {
    redirect(getLocalizedPathname(locale, ROUTES.FORGOT_PASSWORD))
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">{messages.auth.pages.resetPassword.title}</h2>
      <p className="text-muted-foreground text-sm">
        {messages.auth.pages.resetPassword.description}
      </p>
      <div className="pt-2">
        <ResetPasswordForm token={token as string} />
      </div>
    </div>
  )
}
