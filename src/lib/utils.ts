import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  const base =
    typeof window !== 'undefined'
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')
  return `${base}${path}`
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
