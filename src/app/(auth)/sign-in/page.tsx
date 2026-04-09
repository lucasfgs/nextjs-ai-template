import type { Metadata } from 'next'
import { SignInForm } from '@/modules/auth'

export const metadata: Metadata = { title: 'Sign In' }

export default function SignInPage() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Sign in</h2>
      <p className="text-muted-foreground text-sm">Enter your credentials to access your account</p>
      <div className="pt-2">
        <SignInForm />
      </div>
    </div>
  )
}
