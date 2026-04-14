import type { LucideIcon } from 'lucide-react'
import { CreditCard, LayoutDashboard, Settings, ShieldCheck, User } from 'lucide-react'
import { ROUTES } from '@/lib/constants'
import { getMessages, type Locale, stripLocaleFromPathname } from '@/modules/i18n'

export type DashboardNavItem = {
  href: string
  label: string
  description: string
  icon: LucideIcon
  exact?: boolean
}

export type DashboardNavSection = {
  key: 'overview' | 'account'
  label: string
  items: DashboardNavItem[]
}

export function getDashboardNavSections(locale: Locale): DashboardNavSection[] {
  const messages = getMessages(locale)

  return [
    {
      key: 'overview',
      label: messages.navigation.sections.overview,
      items: [
        {
          href: ROUTES.DASHBOARD,
          label: messages.navigation.items.dashboard.label,
          description: messages.navigation.items.dashboard.description,
          icon: LayoutDashboard,
        },
      ],
    },
    {
      key: 'account',
      label: messages.navigation.sections.account,
      items: [
        {
          href: ROUTES.SETTINGS,
          label: messages.navigation.items.settings.label,
          description: messages.navigation.items.settings.description,
          icon: Settings,
          exact: true,
        },
        {
          href: ROUTES.SETTINGS_PROFILE,
          label: messages.navigation.items.profile.label,
          description: messages.navigation.items.profile.description,
          icon: User,
        },
        {
          href: ROUTES.SETTINGS_SECURITY,
          label: messages.navigation.items.security.label,
          description: messages.navigation.items.security.description,
          icon: ShieldCheck,
        },
        {
          href: ROUTES.SETTINGS_BILLING,
          label: messages.navigation.items.billing.label,
          description: messages.navigation.items.billing.description,
          icon: CreditCard,
        },
      ],
    },
  ]
}

export function getDashboardMobileNavItems(locale: Locale) {
  return getDashboardNavSections(locale).flatMap((section) => section.items)
}

export function getSettingsNavigationItems(locale: Locale) {
  return getDashboardNavSections(locale).find((section) => section.key === 'account')?.items ?? []
}

export function isActiveDashboardPath(pathname: string, item: DashboardNavItem) {
  const normalizedPathname = stripLocaleFromPathname(pathname)

  if (item.exact) return normalizedPathname === item.href
  return normalizedPathname === item.href || normalizedPathname.startsWith(item.href + '/')
}
