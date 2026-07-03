import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPageMetadata } from '@/config/page-metadata'
import { ROUTES } from '@/lib/constants'
import { getLocalizedPathname, getRequestI18n, getRequestLocale } from '@/modules/i18n'
import { auth } from '@/modules/auth'
import { ProfileForm, userService } from '@/modules/user'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return getPageMetadata(locale).settingsProfile
}

export default async function ProfileSettingsPage() {
  const [session, { locale, messages }] = await Promise.all([auth(), getRequestI18n()])
  if (!session?.user?.id) redirect(getLocalizedPathname(locale, ROUTES.SIGN_IN))

  const user = await userService.getProfile(session.user.id)
  if (!user) redirect(getLocalizedPathname(locale, ROUTES.SIGN_IN))

  return (
    <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-6">
      <div className="dashboard-panel-strong rounded-[2rem] p-6 sm:p-8">
        <p className="dashboard-kicker">Profile controls</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
          {messages.profile.page.title}
        </h1>
        <p className="mt-3 text-base leading-8 text-[color:color-mix(in_srgb,var(--dashboard-shell-foreground)_68%,transparent)]">
          {messages.profile.page.description}
        </p>
      </div>
      <div className="dashboard-panel w-full max-w-xl rounded-[2rem] p-6">
        <ProfileForm user={user} />
      </div>
    </div>
  )
}
