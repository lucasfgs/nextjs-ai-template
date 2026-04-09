'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { signUpAction } from '../actions/sign-up.action'
import { OAuthButtons } from './oauth-buttons'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-foreground text-background w-full rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Creating account…' : 'Create account'}
    </button>
  )
}

export function SignUpForm() {
  const [state, action] = useActionState(signUpAction, {})

  if (state.success) {
    return (
      <div className="rounded-md bg-green-50 px-4 py-6 text-center text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
        {state.success}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <OAuthButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">Or continue with</span>
        </div>
      </div>

      <form action={action} className="space-y-4">
        {state.error && (
          <div className="bg-destructive/10 text-destructive rounded-md px-4 py-3 text-sm">
            {state.error}
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
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
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
          />
          <p className="text-muted-foreground text-xs">
            Min 8 characters, one uppercase, one number
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm password
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

      <p className="text-muted-foreground text-center text-sm">
        Already have an account?{' '}
        <Link href="/sign-in" className="font-medium underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  )
}
