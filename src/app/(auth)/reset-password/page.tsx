import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { pageMetadata } from '@/config/page-metadata'
import { ResetPasswordForm } from '@/modules/auth'

export const metadata: Metadata = pageMetadata.resetPassword

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams

  if (!token) {
    redirect('/forgot-password')
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Reset password</h2>
      <p className="text-muted-foreground text-sm">Enter your new password below</p>
      <div className="pt-2">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  )
}
