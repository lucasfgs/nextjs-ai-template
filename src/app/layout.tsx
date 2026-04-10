import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from '@/providers'
import { APP_CONFIG } from '@/lib/constants'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.URL),
  title: {
    default: APP_CONFIG.NAME,
    template: `%s | ${APP_CONFIG.NAME}`,
  },
  description: APP_CONFIG.DESCRIPTION,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
