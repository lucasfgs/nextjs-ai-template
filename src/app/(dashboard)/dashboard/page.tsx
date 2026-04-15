import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPageMetadata } from '@/config/page-metadata'
import { ROUTES } from '@/lib/constants'
import { getLocalizedPathname, getRequestLocale } from '@/modules/i18n'
import { auth } from '@/modules/auth'
import { billingService } from '@/modules/billing'
import { TemplateDashboardOverview } from '@/modules/template'
import { userService } from '@/modules/user'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return getPageMetadata(locale).dashboard
}

export default async function DashboardPage() {
  const [session, locale] = await Promise.all([auth(), getRequestLocale()])

  if (!session?.user?.id) {
    redirect(getLocalizedPathname(locale, ROUTES.SIGN_IN))
  }

  const [user, subscription] = await Promise.all([
    userService.getProfile(session.user.id),
    billingService.getUserSubscription(session.user.id),
  ])

  if (!user) {
    redirect(getLocalizedPathname(locale, ROUTES.SIGN_IN))
  }

  return <TemplateDashboardOverview user={user} subscription={subscription} />
}
