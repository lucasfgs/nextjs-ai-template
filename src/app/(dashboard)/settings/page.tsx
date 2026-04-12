import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Settings' }

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="space-y-2">
        <Link
          href="/settings/profile"
          className="hover:bg-accent flex items-center justify-between rounded-lg border p-4 transition-colors"
        >
          <div>
            <p className="font-medium">Profile</p>
            <p className="text-muted-foreground text-sm">Update your name and avatar</p>
          </div>
          <span className="text-muted-foreground">›</span>
        </Link>
        <Link
          href="/settings/security"
          className="hover:bg-accent flex items-center justify-between rounded-lg border p-4 transition-colors"
        >
          <div>
            <p className="font-medium">Security</p>
            <p className="text-muted-foreground text-sm">Manage your password and sessions</p>
          </div>
          <span className="text-muted-foreground">›</span>
        </Link>
        <Link
          href="/settings/billing"
          className="hover:bg-accent flex items-center justify-between rounded-lg border p-4 transition-colors"
        >
          <div>
            <p className="font-medium">Billing</p>
            <p className="text-muted-foreground text-sm">Manage your subscription and payment method</p>
          </div>
          <span className="text-muted-foreground">›</span>
        </Link>
      </div>
    </div>
  )
}
