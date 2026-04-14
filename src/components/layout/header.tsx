'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { APP_CONFIG, ROUTES } from '@/lib/constants'
import { UserAvatar } from '@/modules/auth'

function getAppInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function getPageContext(pathname: string) {
  if (pathname.startsWith(ROUTES.SETTINGS_BILLING)) {
    return {
      eyebrow: 'Settings',
      title: 'Billing',
      description: 'Manage your plan, subscription status, and payment access.',
    }
  }

  if (pathname.startsWith(ROUTES.SETTINGS_PROFILE)) {
    return {
      eyebrow: 'Settings',
      title: 'Profile',
      description: 'Update your personal details and keep your workspace polished.',
    }
  }

  if (pathname.startsWith(ROUTES.SETTINGS_SECURITY)) {
    return {
      eyebrow: 'Settings',
      title: 'Security',
      description: 'Review the latest account protections and upcoming security tools.',
    }
  }

  if (pathname.startsWith(ROUTES.SETTINGS)) {
    return {
      eyebrow: 'Settings',
      title: 'Account settings',
      description: 'Jump into profile, billing, and security controls from one place.',
    }
  }

  return {
    eyebrow: 'Overview',
    title: 'Dashboard',
    description: 'See your account readiness, recent milestones, and suggested next steps.',
  }
}

export function Header() {
  const pathname = usePathname()
  const pageContext = getPageContext(pathname)
  const appInitials = getAppInitials(APP_CONFIG.NAME)

  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href={ROUTES.DASHBOARD}
            className="flex items-center gap-3 rounded-xl transition-opacity hover:opacity-80"
          >
            <span className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold shadow-sm">
              {appInitials}
            </span>
            <div className="hidden sm:block">
              <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-[0.25em]">
                Workspace
              </p>
              <p className="text-sm font-semibold">{APP_CONFIG.NAME}</p>
            </div>
          </Link>

          <div className="bg-border hidden h-9 w-px md:block" />

          <div className="hidden min-w-0 md:block">
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]">
              {pageContext.eyebrow}
            </p>
            <p className="truncate text-sm font-medium">{pageContext.title}</p>
            <p className="text-muted-foreground truncate text-xs">{pageContext.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-muted/60 text-muted-foreground hidden items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium lg:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Ready to customize
          </div>
          <ThemeToggle />
          <UserAvatar />
        </div>
      </div>
    </header>
  )
}
