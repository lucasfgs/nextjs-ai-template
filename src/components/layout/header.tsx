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
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-5 sm:px-6 xl:px-8 2xl:px-10">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href={getLocalizedPathname(locale, ROUTES.DASHBOARD)}
            className="flex items-center gap-3 rounded-xl transition-opacity hover:opacity-80"
          >
            <span className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold shadow-sm">
              {appInitials}
            </span>
            <div className="hidden sm:block">
              <p className="text-muted-foreground text-[11px] font-medium tracking-[0.25em] uppercase">
                {messages.layout.workspace}
              </p>
              <p className="text-sm font-semibold">{APP_CONFIG.NAME}</p>
            </div>
          </Link>

          <div className="bg-border hidden h-9 w-px md:block" />

          <div className="hidden min-w-0 md:block">
            <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
              {pageContext.eyebrow}
            </p>
            <p className="truncate text-sm font-medium">{pageContext.title}</p>
            <p className="text-muted-foreground truncate text-xs">{pageContext.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-muted/60 text-muted-foreground hidden items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium lg:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {messages.layout.readyToCustomize}
          </div>
          <LocaleSwitcher />
          <ThemeToggle />
          <UserAvatar />
        </div>
      </div>
    </header>
  )
}
