jest.mock('@/lib/constants', () => ({
  ROUTES: {
    HOME: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    VERIFY_EMAIL: '/verify-email',
    DASHBOARD: '/dashboard',
    SETTINGS: '/settings',
    SETTINGS_PROFILE: '/settings/profile',
    SETTINGS_SECURITY: '/settings/security',
    SETTINGS_BILLING: '/settings/billing',
  },
}))

import {
  getDashboardNavSections,
  getSettingsNavigationItems,
  isActiveDashboardPath,
} from '@/config/navigation'

describe('navigation translations', () => {
  it('returns localized dashboard navigation labels', () => {
    const sections = getDashboardNavSections('pt')

    expect(sections[0]?.label).toBe('Visão geral')
    expect(sections[0]?.items[0]?.label).toBe('Painel')
    expect(sections[1]?.label).toBe('Conta')
  })

  it('returns localized settings items', () => {
    const items = getSettingsNavigationItems('en')

    expect(items.map((item) => item.label)).toEqual(['Settings', 'Profile', 'Security', 'Billing'])
  })

  it('matches localized pathnames against internal routes', () => {
    const profileItem = getSettingsNavigationItems('en')[1]

    expect(profileItem).toBeDefined()
    expect(isActiveDashboardPath('/pt/settings/profile', profileItem!)).toBe(true)
    expect(isActiveDashboardPath('/pt/settings/billing', profileItem!)).toBe(false)
  })
})
