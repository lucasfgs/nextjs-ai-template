'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'

function subscribe() {
  return () => {}
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

  if (!mounted) return <div className="h-8 w-8" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="hover:bg-accent flex h-8 w-8 items-center justify-center rounded-md border text-sm transition-colors"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
