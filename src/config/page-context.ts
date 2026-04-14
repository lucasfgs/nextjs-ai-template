import { ROUTES } from '@/lib/constants'
import { getMessages, stripLocaleFromPathname, type Locale } from '@/modules/i18n'

export type DashboardPageContext = {
  routePrefix: string
  eyebrow: string
  title: string
  description: string
}

export function getDashboardPageContext(pathname: string, locale: Locale) {
  const messages = getMessages(locale)
  const normalizedPathname = stripLocaleFromPathname(pathname)

  const dashboardPageContexts: DashboardPageContext[] = [
    {
      routePrefix: ROUTES.SETTINGS_BILLING,
      eyebrow: messages.pageContext.billing.eyebrow,
      title: messages.pageContext.billing.title,
      description: messages.pageContext.billing.description,
    },
    {
      routePrefix: ROUTES.SETTINGS_PROFILE,
      eyebrow: messages.pageContext.profile.eyebrow,
      title: messages.pageContext.profile.title,
      description: messages.pageContext.profile.description,
    },
    {
      routePrefix: ROUTES.SETTINGS_SECURITY,
      eyebrow: messages.pageContext.security.eyebrow,
      title: messages.pageContext.security.title,
      description: messages.pageContext.security.description,
    },
    {
      routePrefix: ROUTES.SETTINGS,
      eyebrow: messages.pageContext.settings.eyebrow,
      title: messages.pageContext.settings.title,
      description: messages.pageContext.settings.description,
    },
    {
      routePrefix: ROUTES.DASHBOARD,
      eyebrow: messages.pageContext.dashboard.eyebrow,
      title: messages.pageContext.dashboard.title,
      description: messages.pageContext.dashboard.description,
    },
  ]

  const defaultDashboardPageContext: DashboardPageContext = {
    routePrefix: ROUTES.DASHBOARD,
    eyebrow: messages.pageContext.dashboard.eyebrow,
    title: messages.pageContext.dashboard.title,
    description: messages.pageContext.dashboard.description,
  }

  return (
    dashboardPageContexts.find(
      (context) =>
        normalizedPathname === context.routePrefix ||
        normalizedPathname.startsWith(`${context.routePrefix}/`),
    ) ?? defaultDashboardPageContext
  )
}
