import {
  DEFAULT_LOCALE,
  localeFormattingCodes,
  REQUEST_LOCALE_HEADER,
  supportedLocales,
  type Locale,
} from './i18n.constants'
import { messagesByLocale, type Messages } from './i18n.messages'

export function isLocale(value: string | null | undefined): value is Locale {
  return supportedLocales.includes(value as Locale)
}

export function resolveLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE
}

export function getLocaleFromPathname(pathname: string): Locale | undefined {
  const [segment] = pathname.split('/').filter(Boolean)
  return isLocale(segment) ? segment : undefined
}

export function stripLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname)

  if (!locale) {
    return pathname || '/'
  }

  const normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const strippedPathname = normalizedPathname.slice(locale.length + 1)

  return strippedPathname || '/'
}

export function getLocalizedPathname(locale: Locale, pathname: string): string {
  const normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const pathnameWithoutLocale = stripLocaleFromPathname(normalizedPathname)

  return pathnameWithoutLocale === '/' ? `/${locale}` : `/${locale}${pathnameWithoutLocale}`
}

export function getMessages(locale: Locale = DEFAULT_LOCALE): Messages {
  return messagesByLocale[resolveLocale(locale)]
}

export async function getRequestLocale(): Promise<Locale> {
  const { headers } = await import('next/headers')
  const headersList = await headers()

  return resolveLocale(headersList.get(REQUEST_LOCALE_HEADER))
}

export async function getRequestI18n() {
  const locale = await getRequestLocale()

  return {
    locale,
    messages: getMessages(locale),
  }
}

export function getLocaleFormattingCode(locale: Locale): string {
  return localeFormattingCodes[locale]
}

export function interpolate(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (message, [key, value]) => message.replaceAll(`{${key}}`, String(value)),
    template,
  )
}
