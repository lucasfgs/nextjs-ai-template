import type { Metadata } from 'next'
import { pageMetadata } from '@/config/page-metadata'
import { TemplateSettingsOverview } from '@/modules/template'

export const metadata: Metadata = pageMetadata.settings

export default function SettingsPage() {
  return <TemplateSettingsOverview />
}
