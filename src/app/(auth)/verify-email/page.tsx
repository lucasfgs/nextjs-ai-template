import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageMetadata } from '@/config/page-metadata'
import { ROUTES } from '@/lib/constants'
import { getLocalizedPathname, getRequestI18n, getRequestLocale } from '@/modules/i18n'
import { verifyEmailAction } from '@/modules/auth'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return getPageMetadata(locale).verifyEmail
}

interface VerifyEmailPageProps {
  searchParams: Promise<{ token?: string }>
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const [resolvedSearchParams, { locale, messages }] = await Promise.all([
    searchParams,
    getRequestI18n(),
  ])
  const { token } = resolvedSearchParams
  const signInHref = getLocalizedPathname(locale, ROUTES.SIGN_IN)

  if (!token) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-destructive text-sm">{messages.auth.pages.verifyEmail.invalidLink}</p>
        <Link href={signInHref} className="text-sm underline underline-offset-4">
          {messages.common.backToSignIn}
        </Link>
      </div>
    )
  }

  const formData = new FormData()
  formData.append('token', token)
  const result = await verifyEmailAction({}, formData)

  return (
    <div className="space-y-4 text-center">
      {result.success ? (
        <>
          <p className="text-sm text-green-600 dark:text-green-400">{result.success}</p>
          <Link href={signInHref} className="text-sm underline underline-offset-4">
            {messages.auth.pages.verifyEmail.successLink}
          </Link>
        </>
      ) : (
        <>
          <p className="text-destructive text-sm">{result.error}</p>
          <Link href={signInHref} className="text-sm underline underline-offset-4">
            {messages.common.backToSignIn}
          </Link>
        </>
      )}
    </div>
  )
}
