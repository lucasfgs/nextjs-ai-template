jest.mock('@/env', () => ({
  env: {
    NEXT_PUBLIC_APP_NAME: 'Template App',
    NEXT_PUBLIC_APP_URL: 'https://template.test',
  },
}))

import {
  dashboardMobileNavItems,
  dashboardNavSections,
  getSettingsNavigationItems,
  isActiveDashboardPath,
} from '@/config/navigation'
import { ROUTES } from '@/lib/constants'

describe('navigation config', () => {
  it('groups navigation into overview and account sections', () => {
    expect(dashboardNavSections.map((section) => section.label)).toEqual(['Overview', 'Account'])
  })

  it('flattens mobile navigation items in section order', () => {
    expect(dashboardMobileNavItems.map((item) => item.href)).toEqual([
      ROUTES.DASHBOARD,
      ROUTES.SETTINGS,
      ROUTES.SETTINGS_PROFILE,
      ROUTES.SETTINGS_SECURITY,
      ROUTES.SETTINGS_BILLING,
    ])
  })

  it('returns only account items for settings navigation', () => {
    expect(getSettingsNavigationItems().map((item) => item.href)).toEqual([
      ROUTES.SETTINGS,
      ROUTES.SETTINGS_PROFILE,
      ROUTES.SETTINGS_SECURITY,
      ROUTES.SETTINGS_BILLING,
    ])
  })
})

describe('isActiveDashboardPath()', () => {
  const settingsItem = getSettingsNavigationItems()[0]
  const profileItem = getSettingsNavigationItems()[1]

  it('requires an exact match for exact items', () => {
    expect(isActiveDashboardPath(ROUTES.SETTINGS, settingsItem)).toBe(true)
    expect(isActiveDashboardPath(ROUTES.SETTINGS_PROFILE, settingsItem)).toBe(false)
  })

  it('treats nested paths as active for non-exact items', () => {
    expect(isActiveDashboardPath(ROUTES.SETTINGS_PROFILE, profileItem)).toBe(true)
    expect(isActiveDashboardPath(`${ROUTES.SETTINGS_PROFILE}/edit`, profileItem)).toBe(true)
    expect(isActiveDashboardPath(ROUTES.SETTINGS, profileItem)).toBe(false)
  })
})
