import { redirect } from 'next/navigation'
import { auth } from '@/modules/auth'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
