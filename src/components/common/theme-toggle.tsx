'use client'

import { Moon, Sun } from 'lucide-react'
import { useSyncExternalStore } from 'react'
import { useI18n } from '@/providers/i18n-provider'
import { useTheme } from '@/providers/theme-provider'

function subscribe() {
  return () => {}
}

export function ThemeToggle() {
  const { messages } = useI18n()
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

  if (!mounted) return <div className="h-9 w-9" />

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={messages.common.toggleTheme}
      className="bg-background text-muted-foreground hover:bg-accent hover:text-foreground flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
    >
      {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
