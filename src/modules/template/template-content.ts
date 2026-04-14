import { getMessages, type Locale } from '@/modules/i18n'

export function getTemplateContent(locale: Locale) {
  const messages = getMessages(locale)

  return {
    home: {
      eyebrow: messages.template.home.eyebrow,
      titleSuffix: messages.template.home.titleSuffix,
    },
    dashboard: {
      completionMessage: messages.template.dashboard.completionMessage,
      inProgressMessage: messages.template.dashboard.inProgressMessage,
    },
    settings: {
      title: messages.template.settings.title,
      description: messages.template.settings.description,
    },
  } as const
}

export const templateContent = getTemplateContent('en')
