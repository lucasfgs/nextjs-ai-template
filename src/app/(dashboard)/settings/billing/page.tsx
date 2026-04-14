import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPageMetadata } from '@/config/page-metadata'
import { ROUTES } from '@/lib/constants'
import { billingService, getBillingPlans } from '@/modules/billing'
import { auth } from '@/modules/auth'
import { getLocalizedPathname, getRequestI18n, getRequestLocale, interpolate } from '@/modules/i18n'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return getPageMetadata(locale).settingsBilling
}

export default async function BillingSettingsPage() {
  const [session, { locale, messages }] = await Promise.all([auth(), getRequestI18n()])
  if (!session?.user?.id) redirect(getLocalizedPathname(locale, ROUTES.SIGN_IN))

  const subscription = await billingService.getUserSubscription(session.user.id)
  const billingPlans = Object.values(getBillingPlans(locale))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{messages.billing.page.title}</h1>
        <p className="text-muted-foreground">{messages.billing.page.description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {billingPlans.map((plan) => (
          <div key={plan.id} className="rounded-lg border p-4">
            <h2 className="font-semibold">{plan.name}</h2>
            <p className="text-muted-foreground text-sm">{plan.description}</p>
            <form action="/api/stripe/checkout" method="post" className="mt-4">
              <input type="hidden" name="plan" value={plan.id} />
              <button type="submit" className="rounded-md border px-4 py-2 text-sm font-medium">
                {interpolate(messages.billing.page.startPlan, { planName: plan.name })}
              </button>
            </form>
          </div>
        ))}
      </div>
      <div className="rounded-lg border p-4">
        <p className="font-medium">{messages.common.currentSubscription}</p>
        <p className="text-muted-foreground text-sm">
          {subscription?.status
            ? interpolate(messages.common.statusLabel, {
                status:
                  messages.billing.subscriptionStatuses[
                    subscription.status as keyof typeof messages.billing.subscriptionStatuses
                  ] ?? subscription.status,
              })
            : messages.common.noActiveSubscription}
        </p>
        <form action="/api/stripe/portal" method="post" className="mt-4">
          <button type="submit" className="rounded-md border px-4 py-2 text-sm font-medium">
            {messages.billing.page.openBillingPortal}
          </button>
        </form>
      </div>
    </div>
  )
}
