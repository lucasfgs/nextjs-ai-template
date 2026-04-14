'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { ROUTES } from '@/lib/constants'
import { getLocalizedPathname } from '@/modules/i18n'
import { useI18n } from '@/providers/i18n-provider'
import { forgotPasswordAction } from '../actions/forgot-password.action'

function SubmitButton() {
  const { messages } = useI18n()
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-foreground text-background w-full rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? messages.auth.forms.sending : messages.auth.forms.sendResetLink}
    </button>
  )
}

export function ForgotPasswordForm() {
  const { locale, messages } = useI18n()
  const [state, action] = useActionState(forgotPasswordAction, {})

  if (state.success) {
    return (
      <div className="space-y-4">
        <div className="rounded-md bg-green-50 px-4 py-4 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
          {state.success}
        </div>
        <Link
          href={getLocalizedPathname(locale, ROUTES.SIGN_IN)}
          className="block text-center text-sm underline underline-offset-4"
        >
          {messages.common.backToSignIn}
        </Link>
      </div>
    )
  }

  return (
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

      <SubmitButton />

      <p className="text-muted-foreground text-center text-sm">
        <Link
          href={getLocalizedPathname(locale, ROUTES.SIGN_IN)}
          className="underline underline-offset-4"
        >
          {messages.common.backToSignIn}
        </Link>
      </p>
    </form>
  )
}
