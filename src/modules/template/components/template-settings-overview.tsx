import Link from 'next/link'
import { getSettingsNavigationItems } from '@/config/navigation'
import { getLocalizedPathname, getRequestI18n } from '@/modules/i18n'
import { getTemplateContent } from '../template-content'

export async function TemplateSettingsOverview() {
  const { locale } = await getRequestI18n()
  const templateContent = getTemplateContent(locale)
  const settingsItems = getSettingsNavigationItems(locale)

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_320px]">
        <div className="dashboard-panel-strong dashboard-hero rounded-[2rem] p-6 sm:p-8">
          <p className="dashboard-kicker">Workspace map</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
            {templateContent.settings.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-[color:color-mix(in_srgb,var(--dashboard-shell-foreground)_68%,transparent)]">
            {templateContent.settings.description}
          </p>
        </div>

        <div className="dashboard-panel rounded-[2rem] p-6">
          <p className="dashboard-kicker">At a glance</p>
          <div className="mt-4 space-y-4">
            <div className="dashboard-inset rounded-[1.5rem] p-4">
              <p className="text-3xl font-semibold tracking-[-0.04em]">{settingsItems.length}</p>
              <p className="mt-1 text-sm text-[color:color-mix(in_srgb,var(--dashboard-shell-foreground)_66%,transparent)]">
                account areas available
              </p>
            </div>
            <p className="text-sm leading-7 text-[color:color-mix(in_srgb,var(--dashboard-shell-foreground)_70%,transparent)]">
              Keep profile details, billing, and security controls grouped in one cleaner workspace.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {settingsItems.map((item) => (
          <Link
            key={item.href}
            href={getLocalizedPathname(locale, item.href)}
            className="dashboard-panel group rounded-[1.6rem] p-5 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="flex h-full items-start justify-between gap-4">
              <div>
                <p className="dashboard-kicker">Preferences</p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.02em]">{item.label}</p>
                <p className="mt-2 max-w-md text-sm leading-7 text-[color:color-mix(in_srgb,var(--dashboard-shell-foreground)_64%,transparent)]">
                  {item.description}
                </p>
              </div>
              <span className="dashboard-chip rounded-full px-3 py-1 text-sm transition-transform duration-200 group-hover:translate-x-0.5">
                Open
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
