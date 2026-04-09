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
} as const

const DEFAULT_APP_URL = 'http://localhost:3000'

export const APP_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME ?? 'AI Template',
  DESCRIPTION: 'A production-ready Next.js AI starter template with auth, email, and modular architecture.',
  URL: process.env.NEXT_PUBLIC_APP_URL ?? DEFAULT_APP_URL,
} as const

export const AUTH_COOKIE_NAME = 'authjs.session-token'

export const TOKEN_EXPIRY = {
  EMAIL_VERIFICATION: 24 * 60 * 60 * 1000, // 24 hours
  PASSWORD_RESET: 60 * 60 * 1000, // 1 hour
} as const
