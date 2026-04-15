import {
  getLocaleFromPathname,
  getLocalizedPathname,
  getMessages,
  interpolate,
  stripLocaleFromPathname,
} from '@/modules/i18n'

describe('i18n helpers', () => {
  it('detects the locale from a pathname', () => {
    expect(getLocaleFromPathname('/pt/dashboard')).toBe('pt')
    expect(getLocaleFromPathname('/dashboard')).toBeUndefined()
  })

  it('strips a locale prefix from a pathname', () => {
    expect(stripLocaleFromPathname('/en/settings/profile')).toBe('/settings/profile')
    expect(stripLocaleFromPathname('/pt')).toBe('/')
  })

  it('builds a localized pathname', () => {
    expect(getLocalizedPathname('pt', '/dashboard')).toBe('/pt/dashboard')
    expect(getLocalizedPathname('en', '/')).toBe('/en')
  })

  it('returns translated messages', () => {
    expect(getMessages('pt').common.signIn).toBe('Entrar')
    expect(getMessages('en').navigation.sections.account).toBe('Account')
  })

  it('interpolates placeholder values', () => {
    expect(interpolate('Hello, {name}!', { name: 'Taylor' })).toBe('Hello, Taylor!')
  })
})
