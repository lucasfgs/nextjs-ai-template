import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPageMetadata } from '@/config/page-metadata'
import { ROUTES } from '@/lib/constants'
import { billingService, getBillingPlans, isStripeConfigured } from '@/modules/billing'
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
  const stripeConfigured = isStripeConfigured()

  return (
    <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-6">
      <div className="dashboard-panel-strong rounded-[2rem] p-6 sm:p-8">
        <p className="dashboard-kicker">Commercial controls</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
          {messages.billing.page.title}
        </h1>
        <p className="mt-3 text-base leading-8 text-[color:color-mix(in_srgb,var(--dashboard-shell-foreground)_68%,transparent)]">
          {messages.billing.page.description}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {billingPlans.map((plan) => (
          <div key={plan.id} className="dashboard-panel rounded-[1.8rem] p-5">
            <h2 className="text-lg font-semibold tracking-[-0.02em]">{plan.name}</h2>
            <p className="text-muted-foreground mt-2 text-sm">{plan.description}</p>
            {stripeConfigured ? (
              <form action="/api/stripe/checkout" method="post" className="mt-4">
                <input type="hidden" name="plan" value={plan.id} />
                <button
                  type="submit"
                  className="rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
                >
                  {interpolate(messages.billing.page.startPlan, { planName: plan.name })}
                </button>
              </form>
            ) : (
              <p className="text-muted-foreground mt-4 text-sm">
                Stripe is not configured in this environment.
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="dashboard-panel rounded-[1.8rem] p-5">
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
        {stripeConfigured ? (
          <form action="/api/stripe/portal" method="post" className="mt-4">
            <button
              type="submit"
              className="rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
            >
              {messages.billing.page.openBillingPortal}
            </button>
          </form>
        ) : (
          <p className="text-muted-foreground mt-4 text-sm">
            Add Stripe keys later to enable checkout and billing management.
          </p>
        )}
      </div>
    </div>
  )
}
