import type { Metadata } from 'next'
import { ForgotPasswordForm } from '@/modules/auth'

export const metadata: Metadata = { title: 'Forgot Password' }

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Forgot password?</h2>
      <p className="text-muted-foreground text-sm">
        Enter your email and we&apos;ll send you a reset link
      </p>
      <div className="pt-2">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
