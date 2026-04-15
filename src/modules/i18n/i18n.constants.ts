export const supportedLocales = ['en', 'pt'] as const

export type Locale = (typeof supportedLocales)[number]

export const DEFAULT_LOCALE: Locale = 'en'
export const REQUEST_LOCALE_HEADER = 'x-request-locale'

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
}

export const localeShortLabels: Record<Locale, string> = {
  en: 'EN',
  pt: 'PT',
}

export const localeFormattingCodes: Record<Locale, string> = {
  en: 'en-US',
  pt: 'pt-BR',
}
