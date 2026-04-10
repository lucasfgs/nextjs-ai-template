import { APP_CONFIG } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="text-muted-foreground border-t py-4 text-center text-xs">
      &copy; {new Date().getFullYear()} {APP_CONFIG.NAME}. All rights reserved.
    </footer>
  )
}
