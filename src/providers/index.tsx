import { ThemeProvider } from './theme-provider'
import { SessionProvider } from './session-provider'
import { QueryProvider } from '@/components/common/query-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
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
  )
}
