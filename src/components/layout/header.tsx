import Link from 'next/link'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { UserAvatar } from '@/modules/auth'

export function Header() {
  return (
    <header className="bg-background/95 sticky top-0 z-40 flex h-14 items-center border-b px-4 backdrop-blur-sm">
      <div className="flex flex-1 items-center gap-4">
        <Link href="/dashboard" className="text-sm font-semibold">
          {process.env.NEXT_PUBLIC_APP_NAME ?? 'My App'}
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserAvatar />
      </div>
    </header>
  )
}
