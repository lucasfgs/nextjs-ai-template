import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { APP_CONFIG } from '@/lib/constants'
import { getRequestI18n } from '@/modules/i18n'
import { Providers } from '@/providers'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const { messages } = await getRequestI18n()

  return {
    metadataBase: new URL(APP_CONFIG.URL),
    title: {
      default: APP_CONFIG.NAME,
      template: `%s | ${APP_CONFIG.NAME}`,
    },
    description: messages.app.description,
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, messages } = await getRequestI18n()

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
