'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { updateProfileAction } from '../actions/update-profile.action'
import type { UserProfile } from '../types/user.types'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-foreground text-background rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
    >
      {pending ? 'Saving…' : 'Save changes'}
    </button>
  )
}

interface ProfileFormProps {
  user: UserProfile
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [state, action] = useActionState(updateProfileAction, {})

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <div className="bg-destructive/10 text-destructive rounded-md px-4 py-3 text-sm">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
          {state.success}
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
          defaultValue={user.name ?? ''}
          className="bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={user.email}
          disabled
          className="bg-muted w-full cursor-not-allowed rounded-md border px-3 py-2 text-sm opacity-50"
        />
        <p className="text-muted-foreground text-xs">Email cannot be changed</p>
      </div>

      <SubmitButton />
    </form>
  )
}
