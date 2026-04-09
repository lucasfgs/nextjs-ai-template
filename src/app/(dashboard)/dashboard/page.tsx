import type { Metadata } from 'next'
import { auth } from '@/modules/auth'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {(['Metric 1', 'Metric 2', 'Metric 3'] as const).map((metric) => (
          <div key={metric} className="bg-background rounded-lg border p-4">
            <p className="text-muted-foreground text-sm font-medium">{metric}</p>
            <p className="mt-1 text-2xl font-bold">—</p>
          </div>
        ))}
      </div>
    </div>
  )
}
