'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { ROUTES } from '@/lib/constants'
import { getLocalizedPathname } from '@/modules/i18n'
import { useI18n } from '@/providers/i18n-provider'
import { signInAction } from '../actions/sign-in.action'
import { OAuthButtons } from './oauth-buttons'

function SubmitButton() {
  const { messages } = useI18n()
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-foreground text-background w-full rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? messages.auth.forms.signingIn : messages.common.signIn}
    </button>
  )
}

export function SignInForm() {
  const router = useRouter()
  const { locale, messages } = useI18n()
  const [state, action] = useActionState(signInAction, {})

  useEffect(() => {
    if (state.success) {
      router.push(getLocalizedPathname(locale, ROUTES.DASHBOARD))
      router.refresh()
    }
  }, [locale, router, state.success])

  return (
    <div className="space-y-6">
      <OAuthButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            {messages.auth.forms.orContinueWith}
          </span>
        </div>
      </div>

      <form action={action} className="space-y-4">
        {state.error && (
          <div className="bg-destructive/10 text-destructive rounded-md px-4 py-3 text-sm">
            {state.error}
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">
            {messages.common.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              {messages.common.password}
            </label>
            <Link
              href={getLocalizedPathname(locale, ROUTES.FORGOT_PASSWORD)}
              className="text-muted-foreground text-xs hover:underline"
            >
              {messages.auth.forms.forgotPassword}
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
          />
        </div>

        <SubmitButton />
      </form>

      <p className="text-muted-foreground text-center text-sm">
        {messages.auth.forms.dontHaveAccount}{' '}
        <Link
          href={getLocalizedPathname(locale, ROUTES.SIGN_UP)}
          className="font-medium underline underline-offset-4"
        >
          {messages.common.signUp}
        </Link>
      </p>
    </div>
  )
}
