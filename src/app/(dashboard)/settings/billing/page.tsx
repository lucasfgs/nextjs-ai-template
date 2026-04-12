import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/modules/auth'
import { billingService, billingPlans } from '@/modules/billing'

export const metadata: Metadata = { title: 'Billing Settings' }

export default async function BillingSettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/sign-in')

  const subscription = await billingService.getUserSubscription(session.user.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-muted-foreground">Manage your plan and payment details</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Object.values(billingPlans).map((plan) => (
          <div key={plan.id} className="rounded-lg border p-4">
            <h2 className="font-semibold">{plan.name}</h2>
            <p className="text-muted-foreground text-sm">{plan.description}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border p-4">
        <p className="font-medium">Current subscription</p>
        <p className="text-muted-foreground text-sm">
          {subscription?.status ? `Status: ${subscription.status}` : 'No active subscription'}
        </p>
      </div>
    </div>
  )
}
