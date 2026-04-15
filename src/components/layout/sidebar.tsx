'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  getDashboardMobileNavItems,
  getDashboardNavSections,
  isActiveDashboardPath,
} from '@/config/navigation'
import { APP_CONFIG, ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { getLocalizedPathname } from '@/modules/i18n'
import { useI18n } from '@/providers/i18n-provider'

export function Sidebar() {
  const pathname = usePathname()
  const { locale, messages } = useI18n()
  const dashboardMobileNavItems = getDashboardMobileNavItems(locale)
  const dashboardNavSections = getDashboardNavSections(locale)

  return (
    <aside className="bg-background/90 sticky top-16 z-30 border-b backdrop-blur md:h-[calc(100vh-4rem)] md:w-[320px] md:flex-shrink-0 md:border-r md:border-b-0">
      <div className="px-4 py-4 md:hidden">
        <nav className="flex gap-2 overflow-x-auto pb-1">
          {dashboardMobileNavItems.map((item) => {
            const active = isActiveDashboardPath(pathname, item)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={getLocalizedPathname(locale, item.href)}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
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

      <div className="hidden h-full flex-col md:flex">
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-6">
            {dashboardNavSections.map((section) => (
              <div key={section.key} className="space-y-3">
                <p className="text-muted-foreground px-3 text-[11px] font-semibold tracking-[0.26em] uppercase">
                  {section.label}
                </p>
                <nav className="space-y-1.5">
                  {section.items.map((item) => {
                    const active = isActiveDashboardPath(pathname, item)
                    const Icon = item.icon

                    return (
                      <Link
                        key={item.href}
                        href={getLocalizedPathname(locale, item.href)}
                        className={cn(
                          'group relative flex items-start gap-3 rounded-2xl px-3 py-3.5 transition-all',
                          active
                            ? 'bg-foreground text-background shadow-[0_18px_38px_-24px_rgba(15,23,42,0.55)]'
                            : 'text-muted-foreground hover:bg-accent/70 hover:text-foreground',
                        )}
                      >
                        <span
                          className={cn(
                            'mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border transition-colors',
                            active
                              ? 'border-white/10 bg-white/10 text-white'
                              : 'bg-background text-muted-foreground group-hover:bg-background group-hover:text-foreground',
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span
                            className={cn(
                              'block text-sm font-medium',
                              active ? 'text-white' : 'text-foreground',
                            )}
                          >
                            {item.label}
                          </span>
                          <span
                            className={cn(
                              'mt-1 block text-xs leading-5',
                              active ? 'text-white/70' : 'text-muted-foreground',
                            )}
                          >
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t px-4 py-4">
          <div className="border-border/70 bg-muted/30 rounded-[1.35rem] border p-4">
            <p className="text-sm font-semibold">{APP_CONFIG.NAME}</p>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              {messages.layout.sidebarSummary}
            </p>
            <Link
              href={getLocalizedPathname(locale, ROUTES.DASHBOARD)}
              className="text-foreground mt-4 inline-flex text-sm font-medium hover:underline"
            >
              {messages.layout.overviewHome}
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
