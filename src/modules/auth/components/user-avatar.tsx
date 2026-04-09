'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { signOutAction } from '../actions/sign-out.action'

export function UserAvatar() {
  const { data: session } = useSession()

  if (!session?.user) return null

  const { name, email, image } = session.user
  const initials = name
    ? name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : (email?.[0]?.toUpperCase() ?? '?')

  return (
    <div className="group relative">
      <button className="bg-muted ring-background flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-xs font-medium ring-2">
        {image ? (
          <Image src={image} alt={name ?? 'User'} width={32} height={32} className="object-cover" />
        ) : (
          initials
        )}
      </button>

      <div className="bg-popover absolute top-10 right-0 z-50 hidden w-48 rounded-md border p-1 shadow-md group-hover:block">
        <div className="px-3 py-2 text-xs">
          <p className="font-medium">{name}</p>
          <p className="text-muted-foreground">{email}</p>
        </div>
        <div className="bg-border my-1 h-px" />
        <Link
          href="/settings/profile"
          className="hover:bg-accent block rounded px-3 py-1.5 text-sm"
        >
          Profile
        </Link>
        <Link
          href="/settings/security"
          className="hover:bg-accent block rounded px-3 py-1.5 text-sm"
        >
          Security
        </Link>
        <div className="bg-border my-1 h-px" />
        <form action={signOutAction}>
          <button
            type="submit"
            className="text-destructive hover:bg-accent w-full rounded px-3 py-1.5 text-left text-sm"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}
