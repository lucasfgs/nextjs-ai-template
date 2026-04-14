import type { Metadata } from 'next'
import { pageMetadata } from '@/config/page-metadata'

export const metadata: Metadata = pageMetadata.settingsSecurity

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Security</h1>
        <p className="text-muted-foreground">Manage your password and active sessions</p>
      </div>
      <div className="max-w-md rounded-lg border p-4">
        <p className="text-muted-foreground text-sm">
          Password change and session management coming soon.
        </p>
      </div>
    </div>
  )
}
