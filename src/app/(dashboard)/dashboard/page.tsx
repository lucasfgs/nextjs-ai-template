import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowRight, CalendarDays, CreditCard, ShieldCheck, Sparkles, UserRound } from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from '@/components/ui'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { auth } from '@/modules/auth'
import { billingService } from '@/modules/billing'
import { userService } from '@/modules/user'

export const metadata: Metadata = { title: 'Dashboard' }

const fullDateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const monthYearFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
})

function formatDate(date: Date | null | undefined) {
  if (!date) return 'Not available yet'
  return fullDateFormatter.format(date)
}

function formatMonthYear(date: Date | null | undefined) {
  if (!date) return 'Recently'
  return monthYearFormatter.format(date)
}

function formatEnumLabel(value: string) {
  return value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\\b\\w/g, (character) => character.toUpperCase())
}

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

  const firstName = user.name?.split(' ')[0] ?? user.email.split('@')[0] ?? 'there'
  const hasPersonalizedProfile = Boolean(user.name && user.image)
  const hasActivePlan = subscription?.status === 'ACTIVE' || subscription?.status === 'TRIALING'
  const currentPlan = formatEnumLabel(subscription?.plan ?? 'FREE')
  const currentSubscriptionStatus = subscription ? formatEnumLabel(subscription.status) : 'Free'

  const setupChecklist = [
    { label: 'Add your name', complete: Boolean(user.name) },
    { label: 'Upload an avatar', complete: Boolean(user.image) },
    { label: 'Verify your email', complete: Boolean(user.emailVerified) },
    { label: 'Choose a plan', complete: hasActivePlan },
  ]

  const completedSetupSteps = setupChecklist.filter((step) => step.complete).length
  const setupProgress = Math.round((completedSetupSteps / setupChecklist.length) * 100)

  const primaryAction = hasPersonalizedProfile
    ? { href: ROUTES.SETTINGS, label: 'Open settings' }
    : { href: ROUTES.SETTINGS_PROFILE, label: 'Complete profile' }

  const secondaryAction = hasActivePlan
    ? { href: ROUTES.SETTINGS_BILLING, label: 'Manage billing' }
    : { href: ROUTES.SETTINGS_BILLING, label: 'Explore plans' }

  const summaryCards = [
    {
      title: 'Setup progress',
      value: `${completedSetupSteps}/${setupChecklist.length}`,
      description: `You have completed ${setupProgress}% of the recommended account setup.`,
      icon: Sparkles,
      content: (
        <div className="space-y-3">
          <Progress value={setupProgress} className="h-2" />
          <div className="grid gap-2 sm:grid-cols-2">
            {setupChecklist.map((step) => (
              <div key={step.label} className="flex items-center gap-2 text-xs">
                <span
                  className={cn(
                    'h-2.5 w-2.5 rounded-full',
                    step.complete ? 'bg-emerald-500' : 'bg-muted-foreground/30',
                  )}
                />
                <span className={step.complete ? 'text-foreground' : 'text-muted-foreground'}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Current plan',
      value: currentPlan,
      description: hasActivePlan
        ? subscription?.currentPeriodEnd
          ? `Active through ${formatDate(subscription.currentPeriodEnd)}.`
          : 'Your subscription is active and ready.'
        : 'You are currently on the free experience with room to upgrade.',
      icon: CreditCard,
      content: (
        <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 text-xs font-medium">
          {currentSubscriptionStatus}
        </Badge>
      ),
    },
    {
      title: 'Account status',
      value: user.emailVerified ? 'Verified' : 'Pending',
      description: user.emailVerified
        ? `Your email was verified on ${formatDate(user.emailVerified)}.`
        : 'Verify your email to strengthen account trust and recovery options.',
      icon: ShieldCheck,
      content: (
        <Badge
          variant="outline"
          className={cn(
            'w-fit rounded-full px-3 py-1 text-xs font-medium',
            user.emailVerified
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
              : 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
          )}
        >
          {user.emailVerified ? 'Secure' : 'Needs attention'}
        </Badge>
      ),
    },
    {
      title: 'Member since',
      value: formatMonthYear(user.createdAt),
      description: `Your account was created on ${formatDate(user.createdAt)}.`,
      icon: CalendarDays,
      content: <p className="text-muted-foreground text-xs">A solid foundation for everything ahead.</p>,
    },
  ]

  const activityItems = [
    {
      title: 'Profile readiness',
      badge: hasPersonalizedProfile ? 'Ready' : 'In progress',
      description: hasPersonalizedProfile
        ? 'Your name and avatar are set, so the workspace feels polished and personal.'
        : 'Add your name and avatar to make the product feel tailored to you from the start.',
      icon: UserRound,
    },
    {
      title: 'Billing overview',
      badge: currentPlan,
      description: hasActivePlan
        ? subscription?.currentPeriodEnd
          ? `Your ${currentPlan} plan is active through ${formatDate(subscription.currentPeriodEnd)}.`
          : `Your ${currentPlan} plan is active and ready to support more advanced workflows.`
        : 'You are on the free experience. Upgrade anytime when you are ready for premium capabilities.',
      icon: CreditCard,
    },
    {
      title: 'Account protection',
      badge: user.emailVerified ? 'Verified' : 'Pending',
      description: user.emailVerified
        ? 'Your email is verified, which is a strong signal that the account is healthy and trusted.'
        : 'Email verification is still pending, so keep an eye on your inbox to finish the flow.',
      icon: ShieldCheck,
    },
  ]

  const nextSteps = [
    {
      title: hasPersonalizedProfile ? 'Profile looks good' : 'Finish your profile',
      description: hasPersonalizedProfile
        ? 'Everything basic is in place. Review your personal details anytime.'
        : 'Add your name and avatar so the workspace feels complete and recognizable.',
      href: ROUTES.SETTINGS_PROFILE,
      action: hasPersonalizedProfile ? 'Review profile' : 'Update profile',
      complete: hasPersonalizedProfile,
    },
    {
      title: hasActivePlan ? `${currentPlan} plan is active` : 'Review billing and plans',
      description: hasActivePlan
        ? 'Your subscription is already unlocked. Visit billing whenever you need to manage it.'
        : 'Compare plans and move to a paid tier when you need advanced workflows and support.',
      href: ROUTES.SETTINGS_BILLING,
      action: hasActivePlan ? 'Manage billing' : 'View plans',
      complete: hasActivePlan,
    },
    {
      title: user.emailVerified ? 'Settings hub is ready' : 'Visit your settings hub',
      description: user.emailVerified
        ? 'Use settings as your central place for profile, billing, and upcoming security controls.'
        : 'Review your account areas and keep an eye on security improvements from the settings hub.',
      href: ROUTES.SETTINGS,
      action: 'Open settings',
      complete: user.emailVerified,
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-border/60 bg-gradient-to-br from-background via-background to-muted/60 shadow-sm">
        <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
                {currentPlan} plan
              </Badge>
              <Badge
                variant="outline"
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium',
                  user.emailVerified
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
                )}
              >
                {user.emailVerified ? 'Email verified' : 'Email verification pending'}
              </Badge>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Welcome back, {firstName}
              </h1>
              <p className="text-muted-foreground max-w-2xl text-sm leading-6 sm:text-base">
                {setupProgress === 100
                  ? 'Everything essential is in place. Use the dashboard as a calm launch point for account management and day-to-day progress.'
                  : 'Track the essentials at a glance, finish your setup, and jump back into the areas that matter most without hunting through the app.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={primaryAction.href}>
                  {primaryAction.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 rounded-2xl border bg-background/80 p-4 shadow-sm sm:grid-cols-3 lg:min-w-[360px] lg:grid-cols-1">
            {[
              {
                label: 'Profile',
                value: hasPersonalizedProfile ? 'Ready' : 'Needs setup',
              },
              {
                label: 'Subscription',
                value: currentSubscriptionStatus,
              },
              {
                label: 'Joined',
                value: formatMonthYear(user.createdAt),
              },
            ].map((item) => (
              <div key={item.label} className="space-y-1 rounded-xl border bg-background p-4">
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]">
                  {item.label}
                </p>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon

          return (
            <Card key={card.title} className="border-border/60 shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                <div className="space-y-1">
                  <CardDescription>{card.title}</CardDescription>
                  <CardTitle className="text-2xl">{card.value}</CardTitle>
                </div>
                <span className="bg-muted flex h-10 w-10 items-center justify-center rounded-full border">
                  <Icon className="h-4 w-4" />
                </span>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-6">{card.description}</p>
                {card.content}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Recent activity</CardTitle>
            <CardDescription>
              A simple pulse on the parts of your account that matter most right now.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activityItems.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.title} className="flex gap-4 rounded-xl border p-4">
                  <span className="bg-muted flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium">{item.title}</p>
                      <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-[11px]">
                        {item.badge}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-6">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Recommended next steps</CardTitle>
            <CardDescription>
              Keep momentum by jumping straight into the areas that need attention most.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {nextSteps.map((step) => (
              <div
                key={step.title}
                className={cn(
                  'space-y-4 rounded-xl border p-4',
                  step.complete ? 'bg-muted/30' : 'bg-background shadow-sm',
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium">{step.title}</p>
                      <Badge
                        variant={step.complete ? 'secondary' : 'outline'}
                        className="rounded-full px-2.5 py-0.5 text-[11px]"
                      >
                        {step.complete ? 'Done' : 'Up next'}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-6">{step.description}</p>
                  </div>
                  <Button asChild size="sm" variant={step.complete ? 'outline' : 'default'}>
                    <Link href={step.href}>
                      {step.action}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
