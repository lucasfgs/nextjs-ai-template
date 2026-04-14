'use client'

import { CreditCard, LogOut, ShieldCheck, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui'
import { ROUTES } from '@/lib/constants'
import { getLocalizedPathname } from '@/modules/i18n'
import { useI18n } from '@/providers/i18n-provider'
import { signOutAction } from '../actions/sign-out.action'

export function UserAvatar() {
  const { data: session } = useSession()
  const { locale, messages } = useI18n()

  if (!session?.user) return null

  const { name, email, image } = session.user
  const initials = name
    ? name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : (email?.[0]?.toUpperCase() ?? '?')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={messages.userMenu.openUserMenu}
          className="hover:bg-accent flex items-center gap-3 rounded-full border px-2 py-1.5 text-left transition-colors"
        >
          <span className="bg-muted ring-background flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-xs font-medium ring-2">
            {image ? (
              <Image
                src={image}
                alt={name ?? messages.userMenu.yourAccount}
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block max-w-36 truncate text-sm font-medium">
              {name ?? messages.userMenu.yourAccount}
            </span>
            <span className="text-muted-foreground block max-w-36 truncate text-xs">{email}</span>
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="space-y-1">
          <p className="text-sm font-medium">{name ?? messages.userMenu.yourAccount}</p>
          <p className="text-muted-foreground text-xs font-normal">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={getLocalizedPathname(locale, ROUTES.SETTINGS_PROFILE)}>
            <User className="h-4 w-4" />
            <span>{messages.common.profile}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={getLocalizedPathname(locale, ROUTES.SETTINGS_SECURITY)}>
            <ShieldCheck className="h-4 w-4" />
            <span>{messages.common.security}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={getLocalizedPathname(locale, ROUTES.SETTINGS_BILLING)}>
            <CreditCard className="h-4 w-4" />
            <span>{messages.common.billing}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={signOutAction}>
          <DropdownMenuItem asChild className="text-destructive focus:text-destructive">
            <button type="submit" className="w-full">
              <LogOut className="h-4 w-4" />
              <span>{messages.userMenu.signOut}</span>
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
