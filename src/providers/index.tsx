import type { Locale, Messages } from '@/modules/i18n'
import { QueryProvider } from '@/components/common/query-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { I18nProvider } from './i18n-provider'
import { SessionProvider } from './session-provider'
import { ThemeProvider } from './theme-provider'

type ProvidersProps = {
  children: React.ReactNode
  locale: Locale
  messages: Messages
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <I18nProvider locale={locale} messages={messages}>
      <SessionProvider>
        <QueryProvider>
          <ThemeProvider>
            <TooltipProvider delayDuration={300}>
              {children}
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </QueryProvider>
      </SessionProvider>
    </I18nProvider>
  )
}
