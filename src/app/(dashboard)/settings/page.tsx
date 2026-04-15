import type { Metadata } from 'next'
import { getPageMetadata } from '@/config/page-metadata'
import { getRequestLocale } from '@/modules/i18n'
import { TemplateSettingsOverview } from '@/modules/template'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return getPageMetadata(locale).settings
}

export default function SettingsPage() {
  return <TemplateSettingsOverview />
}
