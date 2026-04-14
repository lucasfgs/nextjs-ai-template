import type { Metadata } from 'next'

export const pageMetadata = {
  signIn: { title: 'Sign In' },
  signUp: { title: 'Sign Up' },
  forgotPassword: { title: 'Forgot Password' },
  resetPassword: { title: 'Reset Password' },
  verifyEmail: { title: 'Verify Email' },
  dashboard: { title: 'Dashboard' },
  settings: { title: 'Settings' },
  settingsProfile: { title: 'Profile Settings' },
  settingsSecurity: { title: 'Security Settings' },
  settingsBilling: { title: 'Billing Settings' },
} satisfies Record<string, Metadata>
