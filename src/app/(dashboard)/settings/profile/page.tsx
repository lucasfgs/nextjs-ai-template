import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { pageMetadata } from '@/config/page-metadata'
import { auth } from '@/modules/auth'
import { userService } from '@/modules/user'
import { ProfileForm } from '@/modules/user'

export const metadata: Metadata = pageMetadata.settingsProfile

export default async function ProfileSettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/sign-in')

  const user = await userService.getProfile(session.user.id)
  if (!user) redirect('/sign-in')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Update your personal information</p>
      </div>
      <div className="max-w-md">
        <ProfileForm user={user} />
      </div>
    </div>
  )
}
