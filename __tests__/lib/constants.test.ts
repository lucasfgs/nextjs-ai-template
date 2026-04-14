jest.mock('@/env', () => ({
  env: {
    NEXT_PUBLIC_APP_NAME: 'Template App',
    NEXT_PUBLIC_APP_URL: 'https://template.test',
  },
}))

import { APP_CONFIG, AUTH_COOKIE_NAME, ROUTES, TOKEN_EXPIRY } from '@/lib/constants'

describe('constants', () => {
  it('exports the main application routes', () => {
    expect(ROUTES).toMatchObject({
      HOME: '/',
      SIGN_IN: '/sign-in',
      DASHBOARD: '/dashboard',
      SETTINGS_BILLING: '/settings/billing',
    })
  })

  it('builds the app config from environment values', () => {
    expect(APP_CONFIG).toEqual({
      NAME: 'Template App',
      DESCRIPTION:
        'A production-ready Next.js AI starter template with auth, email, and modular architecture.',
      URL: 'https://template.test',
    })
  })

  it('defines auth cookie and token expiry constants', () => {
    expect(AUTH_COOKIE_NAME).toBe('authjs.session-token')
    expect(TOKEN_EXPIRY).toEqual({
      EMAIL_VERIFICATION: 24 * 60 * 60 * 1000,
      PASSWORD_RESET: 60 * 60 * 1000,
    })
  })
})
