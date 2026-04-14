'use client'

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

type ThemeSnapshot = {
  theme: Theme
  resolvedTheme: ResolvedTheme
}

type ThemeProviderContextValue = ThemeSnapshot & {
  setTheme: (theme: Theme) => void
}

const STORAGE_KEY = 'ui-theme'
const STORE_EVENT = 'ui-theme-change'
const SERVER_THEME_SNAPSHOT: ThemeSnapshot = {
  theme: 'system',
  resolvedTheme: 'light',
}
let cachedThemeSnapshot: ThemeSnapshot = SERVER_THEME_SNAPSHOT

const ThemeProviderContext = createContext<ThemeProviderContextValue | null>(null)

function resolveSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getThemeSnapshot(): ThemeSnapshot {
  if (typeof window === 'undefined') return SERVER_THEME_SNAPSHOT

  const theme = (window.localStorage.getItem(STORAGE_KEY) as Theme | null) ?? 'system'
  const resolvedTheme = theme === 'system' ? resolveSystemTheme() : theme

  if (cachedThemeSnapshot.theme === theme && cachedThemeSnapshot.resolvedTheme === resolvedTheme) {
    return cachedThemeSnapshot
  }

  cachedThemeSnapshot = { theme, resolvedTheme }
  return cachedThemeSnapshot
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {}

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const handleChange = () => onStoreChange()
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onStoreChange()
  }

  mediaQuery.addEventListener('change', handleChange)
  window.addEventListener('storage', handleStorage)
  window.addEventListener(STORE_EVENT, handleChange)

  return () => {
    mediaQuery.removeEventListener('change', handleChange)
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(STORE_EVENT, handleChange)
  }
}

function applyThemeClass(theme: ResolvedTheme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getThemeSnapshot, () => SERVER_THEME_SNAPSHOT)

  useEffect(() => {
    applyThemeClass(snapshot.resolvedTheme)
  }, [snapshot.resolvedTheme])

  function setTheme(theme: Theme) {
    window.localStorage.setItem(STORAGE_KEY, theme)
    applyThemeClass(theme === 'system' ? resolveSystemTheme() : theme)
    window.dispatchEvent(new Event(STORE_EVENT))
  }

  const value = useMemo(
    () => ({
      ...snapshot,
      setTheme,
    }),
    [snapshot],
  )

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeProviderContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
