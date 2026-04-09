'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { signInAction } from '../actions/sign-in.action'
import { OAuthButtons } from './oauth-buttons'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-foreground text-background w-full rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Signing in…' : 'Sign in'}
    </button>
  )
}

export function SignInForm() {
  const router = useRouter()
  const [state, action] = useActionState(signInAction, {})

  useEffect(() => {
    if (state.success) {
      router.push('/dashboard')
      router.refresh()
    }
  }, [state.success, router])

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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Link href="/forgot-password" className="text-muted-foreground text-xs hover:underline">
              Forgot password?
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
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="font-medium underline underline-offset-4">
          Sign up
        </Link>
      </p>
    </div>
  )
}
