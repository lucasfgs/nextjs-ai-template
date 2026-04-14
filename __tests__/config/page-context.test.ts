jest.mock('@/env', () => ({
  env: {
    NEXT_PUBLIC_APP_NAME: 'Template App',
    NEXT_PUBLIC_APP_URL: 'https://template.test',
  },
}))

import { getDashboardPageContext } from '@/config/page-context'
import { ROUTES } from '@/lib/constants'

describe('getDashboardPageContext()', () => {
  it('returns the billing context for billing routes', () => {
    expect(getDashboardPageContext(ROUTES.SETTINGS_BILLING)).toMatchObject({
      eyebrow: 'Settings',
      title: 'Billing',
    })
  })

  it('prefers the most specific settings match for nested routes', () => {
    expect(getDashboardPageContext(`${ROUTES.SETTINGS_SECURITY}/sessions`)).toMatchObject({
      title: 'Security',
      description: 'Review the latest account protections and upcoming security tools.',
    })
  })

  it('falls back to the dashboard context for unknown paths', () => {
    expect(getDashboardPageContext('/unknown')).toMatchObject({
      routePrefix: ROUTES.DASHBOARD,
      title: 'Dashboard',
    })
  })
})
