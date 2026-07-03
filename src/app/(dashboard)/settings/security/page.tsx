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
    <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-6">
      <div className="dashboard-panel-strong rounded-[2rem] p-6 sm:p-8">
        <p className="dashboard-kicker">Security lane</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
          {messages.security.page.title}
        </h1>
        <p className="mt-3 text-base leading-8 text-[color:color-mix(in_srgb,var(--dashboard-shell-foreground)_68%,transparent)]">
          {messages.security.page.description}
        </p>
      </div>
      <div className="dashboard-panel w-full max-w-xl rounded-[2rem] p-6">
        <p className="text-muted-foreground text-sm">{messages.security.page.comingSoon}</p>
      </div>
    </div>
  )
}
