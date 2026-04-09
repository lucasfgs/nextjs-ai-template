'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Settings, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/settings/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-background hidden w-56 flex-shrink-0 border-r md:flex md:flex-col">
      <nav className="flex flex-col gap-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'hover:bg-accent flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
              pathname === href || pathname.startsWith(href + '/')
                ? 'bg-accent font-medium'
                : 'text-muted-foreground',
            )}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
