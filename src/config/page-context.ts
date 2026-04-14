import { ROUTES } from '@/lib/constants'

export type DashboardPageContext = {
  routePrefix: string
  eyebrow: string
  title: string
  description: string
}

const dashboardPageContexts: DashboardPageContext[] = [
  {
    routePrefix: ROUTES.SETTINGS_BILLING,
    eyebrow: 'Settings',
    title: 'Billing',
    description: 'Manage your plan, subscription status, and payment access.',
  },
  {
    routePrefix: ROUTES.SETTINGS_PROFILE,
    eyebrow: 'Settings',
    title: 'Profile',
    description: 'Update your personal details and keep your workspace polished.',
  },
  {
    routePrefix: ROUTES.SETTINGS_SECURITY,
    eyebrow: 'Settings',
    title: 'Security',
    description: 'Review the latest account protections and upcoming security tools.',
  },
  {
    routePrefix: ROUTES.SETTINGS,
    eyebrow: 'Settings',
    title: 'Account settings',
    description: 'Jump into profile, billing, and security controls from one place.',
  },
  {
    routePrefix: ROUTES.DASHBOARD,
    eyebrow: 'Overview',
    title: 'Dashboard',
    description: 'See your account readiness, recent milestones, and suggested next steps.',
  },
]

const defaultDashboardPageContext: DashboardPageContext = {
  routePrefix: ROUTES.DASHBOARD,
  eyebrow: 'Overview',
  title: 'Dashboard',
  description: 'See your account readiness, recent milestones, and suggested next steps.',
}

export function getDashboardPageContext(pathname: string) {
  return (
    dashboardPageContexts.find(
      (context) =>
        pathname === context.routePrefix || pathname.startsWith(`${context.routePrefix}/`),
    ) ?? defaultDashboardPageContext
  )
}
