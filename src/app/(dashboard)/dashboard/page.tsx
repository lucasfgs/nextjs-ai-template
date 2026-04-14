import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { pageMetadata } from '@/config/page-metadata'
import { auth } from '@/modules/auth'
import { billingService } from '@/modules/billing'
import { TemplateDashboardOverview } from '@/modules/template'
import { userService } from '@/modules/user'

export const metadata: Metadata = pageMetadata.dashboard

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/sign-in')
  }

  const [user, subscription] = await Promise.all([
    userService.getProfile(session.user.id),
    billingService.getUserSubscription(session.user.id),
  ])

  if (!user) {
    redirect('/sign-in')
  }

  return <TemplateDashboardOverview user={user} subscription={subscription} />
}
