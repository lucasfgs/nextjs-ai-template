'use client'

import { useSyncExternalStore } from 'react'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>
type ResolvedToasterTheme = 'light' | 'dark'

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {}

  const observer = new MutationObserver(() => onStoreChange())
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  return () => observer.disconnect()
}

function getSnapshot(): ResolvedToasterTheme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function Toaster({ theme, ...props }: ToasterProps) {
  const resolvedTheme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    (): ResolvedToasterTheme => 'light',
  )

  return (
    <Sonner
      theme={theme ?? resolvedTheme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
