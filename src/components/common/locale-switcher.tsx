'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  getLocalizedPathname,
  localeLabels,
  localeShortLabels,
  supportedLocales,
} from '@/modules/i18n'
import { useI18n } from '@/providers/i18n-provider'
import { cn } from '@/lib/utils'

type LocaleSwitcherProps = {
  className?: string
}

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { locale, messages } = useI18n()
  const search = searchParams.toString()

  return (
    <div
      aria-label={messages.localeSwitcher.label}
      className={cn(
        'bg-background/80 inline-flex items-center rounded-full border p-1 backdrop-blur',
        className,
      )}
      role="group"
    >
      {supportedLocales.map((targetLocale) => {
        const active = targetLocale === locale
        const href = `${getLocalizedPathname(targetLocale, pathname)}${search ? `?${search}` : ''}`

        return (
          <Link
            key={targetLocale}
            href={href}
            aria-current={active ? 'page' : undefined}
            aria-label={localeLabels[targetLocale]}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              active
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          >
            {localeShortLabels[targetLocale]}
          </Link>
        )
      })}
    </div>
  )
}
