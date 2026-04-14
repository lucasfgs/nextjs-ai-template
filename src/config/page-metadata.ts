import type { Metadata } from 'next'
import { getMessages, type Locale } from '@/modules/i18n'

export function getPageMetadata(locale: Locale) {
  const messages = getMessages(locale)

  return {
    signIn: { title: messages.metadata.pages.signIn.title },
    signUp: { title: messages.metadata.pages.signUp.title },
    forgotPassword: { title: messages.metadata.pages.forgotPassword.title },
    resetPassword: { title: messages.metadata.pages.resetPassword.title },
    verifyEmail: { title: messages.metadata.pages.verifyEmail.title },
    dashboard: { title: messages.metadata.pages.dashboard.title },
    settings: { title: messages.metadata.pages.settings.title },
    settingsProfile: { title: messages.metadata.pages.settingsProfile.title },
    settingsSecurity: { title: messages.metadata.pages.settingsSecurity.title },
    settingsBilling: { title: messages.metadata.pages.settingsBilling.title },
  } satisfies Record<string, Metadata>
}
