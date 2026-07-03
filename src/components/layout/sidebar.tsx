'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  getDashboardMobileNavItems,
  getDashboardNavSections,
  isActiveDashboardPath,
} from '@/config/navigation'
import { cn } from '@/lib/utils'
import { getLocalizedPathname } from '@/modules/i18n'
import { useI18n } from '@/providers/i18n-provider'

export function Sidebar() {
  const pathname = usePathname()
  const { locale } = useI18n()
  const dashboardMobileNavItems = getDashboardMobileNavItems(locale)
  const dashboardNavSections = getDashboardNavSections(locale)

  return (
    <aside className="z-30 md:h-[calc(100vh-5.5rem)] md:w-[320px] md:flex-shrink-0">
      <div className="px-4 pt-4 pb-2 sm:px-6 md:hidden">
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
                    ? 'border-transparent bg-[var(--dashboard-nav-active-bg)] text-[var(--dashboard-nav-active-foreground)]'
                    : 'dashboard-panel text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="hidden h-full pt-4 pr-0 pb-6 pl-4 sm:pl-6 md:flex lg:pl-8 xl:pl-10 2xl:pl-12">
        <div className="dashboard-panel flex h-full w-full flex-col rounded-[2rem] border-white/[0.08] bg-[color:var(--dashboard-sidebar-bg)] p-3 shadow-[0_18px_48px_-36px_rgba(2,6,23,0.88)]">
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-5">
              {dashboardNavSections.map((section) => (
                <div key={section.key} className="space-y-2">
                  <p className="dashboard-kicker px-2.5">{section.label}</p>
                  <nav className="space-y-1">
                    {section.items.map((item) => {
                      const active = isActiveDashboardPath(pathname, item)
                      const Icon = item.icon

                      return (
                        <Link
                          key={item.href}
                          href={getLocalizedPathname(locale, item.href)}
                          className={cn(
                            'group flex items-center gap-3 rounded-[1.2rem] px-2.5 py-2.5 transition-colors',
                            active
                              ? 'bg-[var(--dashboard-nav-active-bg)] text-[var(--dashboard-nav-active-foreground)]'
                              : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.06]',
                          )}
                        >
                          <span
                            className={cn(
                              'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[0.95rem] border transition-colors',
                              active
                                ? 'border-slate-900/10 bg-slate-900/8 text-current'
                                : 'text-muted-foreground group-hover:text-foreground border-white/[0.08] bg-white/[0.04]',
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className={cn(
                                'block text-sm font-medium',
                                active
                                  ? 'text-[var(--dashboard-nav-active-foreground)]'
                                  : 'text-foreground',
                              )}
                            >
                              {item.label}
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
        </div>
      </div>
    </aside>
  )
}
