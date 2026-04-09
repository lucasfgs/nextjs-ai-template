'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { resetPasswordAction } from '../actions/reset-password.action'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-foreground text-background w-full rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Resetting…' : 'Reset password'}
    </button>
  )
}

interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [state, action] = useActionState(resetPasswordAction, {})

  if (state.success) {
    return (
      <div className="space-y-4">
        <div className="rounded-md bg-green-50 px-4 py-4 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
          {state.success}
        </div>
        <Link href="/sign-in" className="block text-center text-sm underline underline-offset-4">
          Sign in
        </Link>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="token" value={token} />

      {state.error && (
        <div className="bg-destructive/10 text-destructive rounded-md px-4 py-3 text-sm">
          {state.error}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          New password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          className="bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm new password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          className="bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
        />
      </div>

      <SubmitButton />
    </form>
  )
}
