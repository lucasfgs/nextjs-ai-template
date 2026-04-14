import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { auth } from '@/modules/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect('/sign-in')
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
