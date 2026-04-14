import { env } from '@/env'

export const ROUTES = {
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
} as const

const DEFAULT_APP_DESCRIPTION =
  'A production-ready Next.js AI starter template with auth, email, and modular architecture.'

export const APP_CONFIG = {
  NAME: env.NEXT_PUBLIC_APP_NAME,
  DESCRIPTION: DEFAULT_APP_DESCRIPTION,
  URL: env.NEXT_PUBLIC_APP_URL,
} as const

export const AUTH_COOKIE_NAME = 'authjs.session-token'

export const TOKEN_EXPIRY = {
  EMAIL_VERIFICATION: 24 * 60 * 60 * 1000, // 24 hours
  PASSWORD_RESET: 60 * 60 * 1000, // 1 hour
} as const
