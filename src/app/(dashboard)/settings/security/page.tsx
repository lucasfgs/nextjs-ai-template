import type { Metadata } from 'next'
import { getPageMetadata } from '@/config/page-metadata'
import { getRequestI18n, getRequestLocale } from '@/modules/i18n'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return getPageMetadata(locale).settingsSecurity
}

export default async function SecuritySettingsPage() {
  const { messages } = await getRequestI18n()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{messages.security.page.title}</h1>
        <p className="text-muted-foreground">{messages.security.page.description}</p>
      </div>
      <div className="max-w-md rounded-lg border p-4">
        <p className="text-muted-foreground text-sm">{messages.security.page.comingSoon}</p>
      </div>
    </div>
  )
}
