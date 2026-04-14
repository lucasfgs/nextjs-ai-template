'use client'

import type { LucideIcon } from 'lucide-react'
import { CreditCard, LayoutDashboard, Settings, ShieldCheck, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { APP_CONFIG, ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'

type NavItem = {
  href: string
  label: string
  description: string
  icon: LucideIcon
  exact?: boolean
}

const navSections: { label: string; items: NavItem[] }[] = [
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

const mobileNavItems = navSections.flatMap((section) => section.items)

function isActivePath(pathname: string, item: NavItem) {
  if (item.exact) return pathname === item.href
  return pathname === item.href || pathname.startsWith(item.href + '/')
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-background/80 sticky top-16 z-30 border-b backdrop-blur md:h-[calc(100vh-4rem)] md:w-72 md:flex-shrink-0 md:border-r md:border-b-0">
      <div className="px-4 py-4 md:hidden">
        <nav className="flex gap-2 overflow-x-auto pb-1">
          {mobileNavItems.map((item) => {
            const active = isActivePath(pathname, item)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="hidden h-full flex-col gap-6 p-4 md:flex">
        {navSections.map((section) => (
          <div key={section.label} className="space-y-3">
            <p className="text-muted-foreground px-3 text-xs font-medium uppercase tracking-[0.2em]">
              {section.label}
            </p>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const active = isActivePath(pathname, item)
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group flex items-start gap-3 rounded-xl border border-transparent px-3 py-3 transition-all',
                      active
                        ? 'bg-accent border-border/60 shadow-sm'
                        : 'text-muted-foreground hover:bg-accent/70 hover:text-foreground',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border transition-colors',
                        active
                          ? 'bg-background text-foreground shadow-sm'
                          : 'bg-muted/50 text-muted-foreground group-hover:bg-background group-hover:text-foreground',
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-foreground">{item.label}</span>
                      <span className="text-muted-foreground block text-xs leading-5">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                )
              })}
            </nav>
          </div>
        ))}

        <div className="mt-auto rounded-xl border bg-muted/40 p-4">
          <p className="text-sm font-semibold">{APP_CONFIG.NAME}</p>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Use the dashboard to manage your profile, security, and billing from one
            polished workspace.
          </p>
          <Link
            href={ROUTES.DASHBOARD}
            className="text-primary mt-3 inline-flex text-sm font-medium hover:underline"
          >
            Back to overview
          </Link>
        </div>
      </div>
    </aside>
  )
}
