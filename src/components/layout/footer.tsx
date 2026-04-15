import { APP_CONFIG } from '@/lib/constants'
import { getRequestI18n } from '@/modules/i18n'

export async function Footer() {
  const { messages } = await getRequestI18n()

  return (
    <footer className="text-muted-foreground border-t py-4 text-center text-xs">
      &copy; {new Date().getFullYear()} {APP_CONFIG.NAME}. {messages.layout.footerRights}
    </footer>
  )
}
