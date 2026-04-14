import type { LucideIcon } from 'lucide-react'
import { CreditCard, LayoutDashboard, Settings, ShieldCheck, User } from 'lucide-react'
import { ROUTES } from '@/lib/constants'

export type DashboardNavItem = {
  href: string
  label: string
  description: string
  icon: LucideIcon
  exact?: boolean
}

export type DashboardNavSection = {
  label: string
  items: DashboardNavItem[]
}

export const dashboardNavSections: DashboardNavSection[] = [
  {
    label: 'Overview',
    items: [
      {
        href: ROUTES.DASHBOARD,
        label: 'Dashboard',
        description: 'See your account pulse and recommended next steps.',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        href: ROUTES.SETTINGS,
        label: 'Settings',
        description: 'View your account sections and overall preferences.',
        icon: Settings,
        exact: true,
      },
      {
        href: ROUTES.SETTINGS_PROFILE,
        label: 'Profile',
        description: 'Update your name, avatar, and personal details.',
        icon: User,
      },
      {
        href: ROUTES.SETTINGS_SECURITY,
        label: 'Security',
        description: 'Track password and account protection updates.',
        icon: ShieldCheck,
      },
      {
        href: ROUTES.SETTINGS_BILLING,
        label: 'Billing',
        description: 'Manage plans, subscriptions, and payment access.',
        icon: CreditCard,
      },
    ],
  },
]

export const dashboardMobileNavItems = dashboardNavSections.flatMap((section) => section.items)

export function getSettingsNavigationItems() {
  return dashboardNavSections.find((section) => section.label === 'Account')?.items ?? []
}

export function isActiveDashboardPath(pathname: string, item: DashboardNavItem) {
  if (item.exact) return pathname === item.href
  return pathname === item.href || pathname.startsWith(item.href + '/')
}
