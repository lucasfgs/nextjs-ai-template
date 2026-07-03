import { redirect } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { DASHBOARD_APPEARANCE, ROUTES } from '@/lib/constants'
import { getLocalizedPathname, getRequestLocale } from '@/modules/i18n'
import { auth } from '@/modules/auth'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [session, locale] = await Promise.all([auth(), getRequestLocale()])

  if (!session?.user) {
    redirect(getLocalizedPathname(locale, ROUTES.SIGN_IN))
  }

  return (
    <div
      data-dashboard-style={DASHBOARD_APPEARANCE.DEFAULT_PRESET}
      className="dashboard-shell min-h-screen"
    >
      <Header />
      <div className="flex min-h-[calc(100vh-5.5rem)] w-full flex-col md:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <div className="px-5 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10 2xl:px-12">{children}</div>
        </main>
      </div>
    </div>
  )
}
