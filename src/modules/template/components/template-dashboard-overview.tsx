import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRound,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import {
  getLocaleFormattingCode,
  getLocalizedPathname,
  getRequestI18n,
  interpolate,
} from '@/modules/i18n'

type TemplateDashboardUser = {
  name: string | null
  email: string
  image: string | null
  emailVerified: Date | null
  createdAt: Date
}

type TemplateDashboardSubscription = {
  plan: string
  status: string
  currentPeriodEnd: Date | null
} | null

type TemplateDashboardOverviewProps = {
  user: TemplateDashboardUser
  subscription: TemplateDashboardSubscription
}

function getToneClass(tone: 'good' | 'warn' | 'neutral') {
  if (tone === 'good') return 'text-emerald-700 dark:text-emerald-300'
  if (tone === 'warn') return 'text-amber-700 dark:text-amber-300'
  return 'text-muted-foreground'
}

function MiniTrendChart({
  values,
  title,
  eyebrow,
  days,
}: {
  values: number[]
  title: string
  eyebrow: string
  days: readonly string[]
}) {
  const width = 320
  const height = 120
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = Math.max(max - min, 1)
  const step = width / (values.length - 1)

  const points = values
    .map((value, index) => {
      const x = index * step
      const y = height - ((value - min) / range) * (height - 16) - 8
      return `${x},${y}`
    })
    .join(' ')

  const area = `${points} ${width},${height} 0,${height}`

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-4 text-white shadow-[0_24px_80px_-32px_rgba(15,23,42,0.9)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.28em] text-slate-400 uppercase">{eyebrow}</p>
          <p className="mt-1 text-lg font-semibold">{title}</p>
        </div>
        <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
          +18.4%
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="h-32 w-full">
        <defs>
          <linearGradient id="dashboard-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={`M ${area}`} fill="url(#dashboard-area)" />
        <polyline
          fill="none"
          stroke="#67e8f9"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {values.map((value, index) => {
          const x = index * step
          const y = height - ((value - min) / range) * (height - 16) - 8
          return <circle key={`${value}-${index}`} cx={x} cy={y} r="4.5" fill="#f8fafc" />
        })}
      </svg>

      <div className="mt-4 grid grid-cols-7 gap-2 text-xs text-slate-400">
        {days.map((day, index) => (
          <div key={day} className="space-y-1">
            <p>{day}</p>
            <p className="font-medium text-slate-200">{values[index]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RadialGauge({
  value,
  label,
  tone = 'good',
  readyLabel,
  positiveLabel,
  warningLabel,
  helper,
}: {
  value: number
  label: string
  tone?: 'good' | 'warn'
  readyLabel: string
  positiveLabel: string
  warningLabel: string
  helper: string
}) {
  const radius = 44
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - value / 100)

  return (
    <div className="bg-background/80 flex items-center gap-4 rounded-2xl border p-4">
      <div className="relative h-24 w-24">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            className="text-muted/60"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            className={cn(tone === 'good' ? 'text-emerald-500' : 'text-amber-500')}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">{value}%</span>
          <span className="text-muted-foreground text-[11px] tracking-[0.22em] uppercase">
            {readyLabel}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium">{label}</p>
        <p className={cn('text-sm', getToneClass(tone))}>
          {tone === 'good' ? positiveLabel : warningLabel}
        </p>
        <p className="text-muted-foreground text-sm leading-6">{helper}</p>
      </div>
    </div>
  )
}

export async function TemplateDashboardOverview({
  user,
  subscription,
}: TemplateDashboardOverviewProps) {
  const { locale, messages } = await getRequestI18n()
  const localeCode = getLocaleFormattingCode(locale)
  const fullDateFormatter = new Intl.DateTimeFormat(localeCode, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const monthYearFormatter = new Intl.DateTimeFormat(localeCode, {
    month: 'short',
    year: 'numeric',
  })

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return messages.common.notAvailableYet
    return fullDateFormatter.format(date)
  }

  const formatMonthYear = (date: Date | null | undefined) => {
    if (!date) return messages.common.recently
    return monthYearFormatter.format(date)
  }

  const formatPlanLabel = (value: string | null | undefined) => {
    const key = (value ?? 'FREE') as keyof typeof messages.billing.planNames
    return messages.billing.planNames[key] ?? value ?? messages.billing.planNames.FREE
  }

  const formatSubscriptionStatus = (value: string | null | undefined) => {
    const key = (value ?? 'INACTIVE') as keyof typeof messages.billing.subscriptionStatuses
    return (
      messages.billing.subscriptionStatuses[key] ??
      value ??
      messages.billing.subscriptionStatuses.INACTIVE
    )
  }

  const firstName =
    user.name?.split(' ')[0] ?? user.email.split('@')[0] ?? (locale === 'pt' ? 'você' : 'there')
  const hasPersonalizedProfile = Boolean(user.name && user.image)
  const hasActivePlan = subscription?.status === 'ACTIVE' || subscription?.status === 'TRIALING'
  const currentPlan = formatPlanLabel(subscription?.plan)
  const currentSubscriptionStatus = subscription
    ? formatSubscriptionStatus(subscription.status)
    : messages.billing.planNames.FREE

  const setupChecklist = [
    {
      label: messages.template.dashboard.checklist.identity.label,
      complete: Boolean(user.name),
      detail: messages.template.dashboard.checklist.identity.detail,
    },
    {
      label: messages.template.dashboard.checklist.avatar.label,
      complete: Boolean(user.image),
      detail: messages.template.dashboard.checklist.avatar.detail,
    },
    {
      label: messages.template.dashboard.checklist.verification.label,
      complete: Boolean(user.emailVerified),
      detail: user.emailVerified
        ? interpolate(messages.template.dashboard.checklist.verification.detailVerified, {
            date: formatDate(user.emailVerified),
          })
        : messages.template.dashboard.checklist.verification.detailPending,
    },
    {
      label: messages.template.dashboard.checklist.plan.label,
      complete: hasActivePlan,
      detail: hasActivePlan
        ? subscription?.currentPeriodEnd
          ? interpolate(messages.template.dashboard.checklist.plan.detailActiveThrough, {
              date: formatDate(subscription.currentPeriodEnd),
            })
          : messages.template.dashboard.checklist.plan.detailActive
        : messages.template.dashboard.checklist.plan.detailPending,
    },
  ]

  const completedSetupSteps = setupChecklist.filter((step) => step.complete).length
  const setupProgress = Math.round((completedSetupSteps / setupChecklist.length) * 100)
  const readinessTone = setupProgress >= 75 ? 'good' : 'warn'

  const primaryAction = hasPersonalizedProfile
    ? {
        href: getLocalizedPathname(locale, ROUTES.SETTINGS),
        label: messages.template.dashboard.primaryActions.openWorkspaceSettings,
      }
    : {
        href: getLocalizedPathname(locale, ROUTES.SETTINGS_PROFILE),
        label: messages.template.dashboard.primaryActions.completeProfile,
      }

  const secondaryAction = hasActivePlan
    ? {
        href: getLocalizedPathname(locale, ROUTES.SETTINGS_BILLING),
        label: messages.template.dashboard.primaryActions.manageBilling,
      }
    : {
        href: getLocalizedPathname(locale, ROUTES.SETTINGS_BILLING),
        label: messages.template.dashboard.primaryActions.reviewPlans,
      }

  const kpis = [
    {
      label: messages.template.dashboard.kpis.plan,
      value: currentPlan,
      note: hasActivePlan
        ? currentSubscriptionStatus
        : messages.template.dashboard.kpis.starterAccess,
      icon: CreditCard,
    },
    {
      label: messages.template.dashboard.kpis.security,
      value: user.emailVerified
        ? messages.template.dashboard.kpis.verified
        : messages.template.dashboard.kpis.pending,
      note: user.emailVerified
        ? messages.template.dashboard.kpis.recoveryReady
        : messages.template.dashboard.kpis.confirmationNeeded,
      icon: ShieldCheck,
    },
    {
      label: messages.template.dashboard.kpis.memberSince,
      value: formatMonthYear(user.createdAt),
      note: formatDate(user.createdAt),
      icon: CalendarDays,
    },
  ]

  const trendValues = [32, 38, 41, 49, 54, 58, 67]

  const focusItems = [
    {
      title: hasPersonalizedProfile
        ? messages.template.dashboard.focusItems.profile.titleReady
        : messages.template.dashboard.focusItems.profile.titlePending,
      description: hasPersonalizedProfile
        ? messages.template.dashboard.focusItems.profile.descriptionReady
        : messages.template.dashboard.focusItems.profile.descriptionPending,
      href: getLocalizedPathname(locale, ROUTES.SETTINGS_PROFILE),
      action: hasPersonalizedProfile
        ? messages.template.dashboard.focusItems.profile.actionReady
        : messages.template.dashboard.focusItems.profile.actionPending,
      tone: hasPersonalizedProfile ? 'good' : 'warn',
      icon: UserRound,
    },
    {
      title: hasActivePlan
        ? messages.template.dashboard.focusItems.billing.titleReady
        : messages.template.dashboard.focusItems.billing.titlePending,
      description: hasActivePlan
        ? subscription?.currentPeriodEnd
          ? interpolate(messages.template.dashboard.focusItems.billing.descriptionReadyWithDate, {
              date: formatDate(subscription.currentPeriodEnd),
            })
          : messages.template.dashboard.focusItems.billing.descriptionReady
        : messages.template.dashboard.focusItems.billing.descriptionPending,
      href: getLocalizedPathname(locale, ROUTES.SETTINGS_BILLING),
      action: hasActivePlan
        ? messages.template.dashboard.focusItems.billing.actionReady
        : messages.template.dashboard.focusItems.billing.actionPending,
      tone: hasActivePlan ? 'good' : 'neutral',
      icon: CreditCard,
    },
    {
      title: user.emailVerified
        ? messages.template.dashboard.focusItems.verification.titleReady
        : messages.template.dashboard.focusItems.verification.titlePending,
      description: user.emailVerified
        ? messages.template.dashboard.focusItems.verification.descriptionReady
        : messages.template.dashboard.focusItems.verification.descriptionPending,
      href: getLocalizedPathname(locale, ROUTES.SETTINGS_SECURITY),
      action: messages.template.dashboard.focusItems.verification.action,
      tone: user.emailVerified ? 'good' : 'warn',
      icon: ShieldCheck,
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-border/70 from-background via-background overflow-hidden bg-gradient-to-br to-slate-50 shadow-[0_28px_80px_-42px_rgba(15,23,42,0.35)] dark:to-slate-950">
        <CardContent className="p-0">
          <div className="grid gap-0 xl:grid-cols-[minmax(0,1.25fr)_420px]">
            <div className="space-y-8 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="rounded-full border border-sky-200/70 bg-sky-50 px-3 py-1 text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200"
                >
                  {messages.template.dashboard.executiveOverview}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    'rounded-full px-3 py-1',
                    user.emailVerified
                      ? 'border-emerald-500/25 bg-emerald-500/8 text-emerald-700 dark:text-emerald-300'
                      : 'border-amber-500/25 bg-amber-500/8 text-amber-700 dark:text-amber-300',
                  )}
                >
                  {user.emailVerified
                    ? messages.template.dashboard.emailVerified
                    : messages.template.dashboard.verificationPending}
                </Badge>
              </div>

              <div className="max-w-3xl space-y-4">
                <div className="space-y-3">
                  <p className="text-muted-foreground text-xs font-medium tracking-[0.3em] uppercase">
                    {messages.template.dashboard.workspaceStatus}
                  </p>
                  <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                    {interpolate(messages.template.dashboard.welcomeBack, { name: firstName })}
                  </h1>
                </div>
                <p className="text-muted-foreground max-w-2xl text-base leading-8">
                  {setupProgress === 100
                    ? messages.template.dashboard.completionMessage
                    : messages.template.dashboard.inProgressMessage}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {kpis.map((kpi) => {
                  const Icon = kpi.icon

                  return (
                    <div
                      key={kpi.label}
                      className="border-border/70 bg-background/80 rounded-[1.5rem] border p-4 shadow-sm backdrop-blur"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-muted-foreground text-xs tracking-[0.24em] uppercase">
                          {kpi.label}
                        </p>
                        <span className="bg-muted/70 flex h-9 w-9 items-center justify-center rounded-full border">
                          <Icon className="h-4 w-4" />
                        </span>
                      </div>
                      <p className="mt-5 text-2xl font-semibold tracking-tight">{kpi.value}</p>
                      <p className="text-muted-foreground mt-1 text-sm">{kpi.note}</p>
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-5">
                  <Link href={primaryAction.href}>
                    {primaryAction.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-5">
                  <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
                </Button>
              </div>
            </div>

            <div className="border-border/60 border-t bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_42%),linear-gradient(180deg,rgba(15,23,42,0.02),rgba(15,23,42,0.08))] p-6 sm:p-8 xl:border-t-0 xl:border-l">
              <MiniTrendChart
                values={trendValues}
                eyebrow={messages.template.dashboard.trend.eyebrow}
                title={messages.template.dashboard.trend.title}
                days={messages.template.dashboard.trend.days}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_380px]">
        <div className="space-y-6">
          <Card className="border-border/70 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.25)]">
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="text-[1.65rem] tracking-tight">
                    {messages.template.dashboard.readiness.title}
                  </CardTitle>
                  <CardDescription>
                    {messages.template.dashboard.readiness.description}
                  </CardDescription>
                </div>
                <div className="rounded-full border px-3 py-1 text-sm font-medium">
                  {interpolate(messages.template.dashboard.readiness.completed, {
                    completed: completedSetupSteps,
                    total: setupChecklist.length,
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
                <RadialGauge
                  value={setupProgress}
                  label={messages.template.dashboard.readiness.label}
                  tone={readinessTone}
                  readyLabel={messages.template.dashboard.readiness.ready}
                  positiveLabel={messages.template.dashboard.readiness.healthyTrajectory}
                  warningLabel={messages.template.dashboard.readiness.needsAttention}
                  helper={messages.template.dashboard.readiness.helper}
                />

                <div className="grid gap-3">
                  {setupChecklist.map((step) => (
                    <div
                      key={step.label}
                      className="border-border/70 bg-muted/20 flex items-start gap-4 rounded-2xl border px-4 py-4"
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border',
                          step.complete
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                            : 'border-border bg-background text-muted-foreground',
                        )}
                      >
                        {step.complete ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium">{step.label}</p>
                          <span
                            className={cn(
                              'text-xs font-medium',
                              step.complete
                                ? 'text-emerald-600 dark:text-emerald-300'
                                : 'text-muted-foreground',
                            )}
                          >
                            {step.complete ? messages.common.complete : messages.common.pending}
                          </span>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm leading-6">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.25)]">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-[1.5rem] tracking-tight">
                    {messages.template.dashboard.activation.title}
                  </CardTitle>
                  <CardDescription>
                    {messages.template.dashboard.activation.description}
                  </CardDescription>
                </div>
                <TrendingUp className="text-muted-foreground h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                {
                  label: messages.template.dashboard.activation.identityComplete,
                  value: hasPersonalizedProfile ? 86 : 46,
                  tone: 'bg-sky-500',
                },
                {
                  label: messages.template.dashboard.activation.securityTrust,
                  value: user.emailVerified ? 92 : 54,
                  tone: 'bg-emerald-500',
                },
                {
                  label: messages.template.dashboard.activation.commercialReadiness,
                  value: hasActivePlan ? 78 : 38,
                  tone: 'bg-violet-500',
                },
                {
                  label: messages.template.dashboard.activation.workspacePolish,
                  value: setupProgress,
                  tone: 'bg-amber-500',
                },
              ].map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium">{metric.label}</span>
                    <span className="text-muted-foreground">{metric.value}%</span>
                  </div>
                  <div className="bg-muted h-2.5 overflow-hidden rounded-full">
                    <div
                      className={cn('h-full rounded-full', metric.tone)}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/70 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.25)]">
            <CardHeader className="pb-4">
              <CardTitle className="text-[1.5rem] tracking-tight">
                {messages.template.dashboard.priorityQueue.title}
              </CardTitle>
              <CardDescription>
                {messages.template.dashboard.priorityQueue.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {focusItems.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="border-border/70 bg-muted/20 rounded-2xl border p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="bg-background flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium">{item.title}</p>
                          <span
                            className={cn(
                              'text-xs font-medium',
                              getToneClass(item.tone as 'good' | 'warn' | 'neutral'),
                            )}
                          >
                            {item.tone === 'good'
                              ? messages.common.healthy
                              : item.tone === 'warn'
                                ? messages.common.actionNeeded
                                : messages.common.optional}
                          </span>
                        </div>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {item.description}
                        </p>
                        <Button asChild variant="ghost" className="mt-3 h-auto px-0 text-sm">
                          <Link href={item.href}>
                            {item.action}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.95)]">
            <CardHeader className="pb-4">
              <CardTitle className="text-[1.45rem] tracking-tight text-white">
                {messages.template.dashboard.snapshot.title}
              </CardTitle>
              <CardDescription className="text-slate-300">
                {messages.template.dashboard.snapshot.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs tracking-[0.24em] text-slate-400 uppercase">
                    {messages.template.dashboard.snapshot.planStatus}
                  </p>
                  <p className="mt-4 text-2xl font-semibold">{currentPlan}</p>
                  <p className="mt-1 text-sm text-slate-300">{currentSubscriptionStatus}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs tracking-[0.24em] text-slate-400 uppercase">
                    {messages.template.dashboard.snapshot.memberSince}
                  </p>
                  <p className="mt-4 text-2xl font-semibold">{formatMonthYear(user.createdAt)}</p>
                  <p className="mt-1 text-sm text-slate-300">{formatDate(user.createdAt)}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.24em] text-slate-400 uppercase">
                      {messages.template.dashboard.snapshot.operatorNote}
                    </p>
                    <p className="mt-2 text-lg font-semibold">
                      {hasActivePlan
                        ? messages.template.dashboard.snapshot.healthyTitle
                        : messages.template.dashboard.snapshot.pendingTitle}
                    </p>
                  </div>
                  <Sparkles className="h-5 w-5 text-cyan-300" />
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {hasActivePlan
                    ? messages.template.dashboard.snapshot.healthyDescription
                    : messages.template.dashboard.snapshot.pendingDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
