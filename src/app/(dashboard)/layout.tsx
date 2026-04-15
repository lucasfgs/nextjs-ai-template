import { redirect } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { ROUTES } from '@/lib/constants'
import { getLocalizedPathname, getRequestLocale } from '@/modules/i18n'
import { auth } from '@/modules/auth'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [session, locale] = await Promise.all([auth(), getRequestLocale()])

  if (!session?.user) {
    redirect(getLocalizedPathname(locale, ROUTES.SIGN_IN))
  }

  return (
    <div className="bg-muted/20 min-h-screen">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col md:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <div className="px-5 py-6 sm:px-6 lg:py-8 xl:px-8 2xl:px-10">{children}</div>
        </main>
      </div>
    </div>
  )
}
