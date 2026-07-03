'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LocaleSwitcher } from '@/components/common/locale-switcher'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { getDashboardPageContext } from '@/config/page-context'
import { APP_CONFIG, ROUTES } from '@/lib/constants'
import { getLocalizedPathname } from '@/modules/i18n'
import { UserAvatar } from '@/modules/auth/client'
import { useI18n } from '@/providers/i18n-provider'

function getAppInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function Header() {
  const pathname = usePathname()
  const { locale, messages } = useI18n()
  const pageContext = getDashboardPageContext(pathname, locale)
  const appInitials = getAppInitials(APP_CONFIG.NAME)

  return (
    <header className="bg-transparent">
      <div className="px-5 pt-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="dashboard-panel mx-auto flex h-[4.5rem] w-full items-center justify-between gap-4 rounded-[1.75rem] border-white/[0.08] bg-white/[0.025] px-4 shadow-[0_18px_48px_-36px_rgba(2,6,23,0.84)] sm:px-5">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              href={getLocalizedPathname(locale, ROUTES.DASHBOARD)}
              className="flex items-center gap-3 rounded-2xl transition-opacity hover:opacity-80"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--dashboard-accent),color-mix(in_srgb,var(--dashboard-accent-2)_70%,white))] text-sm font-semibold text-white shadow-[0_16px_36px_-20px_color-mix(in_srgb,var(--dashboard-accent)_55%,transparent)]">
                {appInitials}
              </span>
              <div className="hidden sm:block">
                <p className="dashboard-kicker">{messages.layout.workspace}</p>
                <p className="text-sm font-semibold tracking-[-0.02em]">{APP_CONFIG.NAME}</p>
              </div>
            </Link>

            <div className="hidden h-10 w-px bg-white/[0.08] md:block" />

            <div className="hidden min-w-0 md:block">
              <p className="dashboard-kicker">{pageContext.eyebrow}</p>
              <p className="truncate text-sm font-semibold tracking-[-0.02em]">
                {pageContext.title}
              </p>
              <p className="truncate text-xs text-[color:color-mix(in_srgb,var(--dashboard-shell-foreground)_62%,transparent)]">
                {pageContext.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="dashboard-chip hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium lg:flex">
              <span className="h-2 w-2 rounded-full bg-[var(--dashboard-accent-2)]" />
              {messages.layout.readyToCustomize}
            </div>
            <LocaleSwitcher className="border-white/[0.08] bg-white/[0.045]" />
            <ThemeToggle />
            <UserAvatar />
          </div>
        </div>
      </div>
    </header>
  )
}
