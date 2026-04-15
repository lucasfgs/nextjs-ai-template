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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{messages.profile.page.title}</h1>
        <p className="text-muted-foreground">{messages.profile.page.description}</p>
      </div>
      <div className="max-w-md">
        <ProfileForm user={user} />
      </div>
    </div>
  )
}
