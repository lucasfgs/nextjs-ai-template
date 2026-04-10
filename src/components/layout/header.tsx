import Link from 'next/link'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { UserAvatar } from '@/modules/auth'
import { APP_CONFIG, ROUTES } from '@/lib/constants'

export function Header() {
  return (
    <header className="bg-background/95 sticky top-0 z-40 flex h-14 items-center border-b px-4 backdrop-blur-sm">
      <div className="flex flex-1 items-center gap-4">
        <Link href={ROUTES.DASHBOARD} className="text-sm font-semibold">
          {APP_CONFIG.NAME}
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserAvatar />
      </div>
    </header>
  )
}
