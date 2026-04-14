import type { Metadata } from 'next'
import { pageMetadata } from '@/config/page-metadata'
import { SignUpForm } from '@/modules/auth'

export const metadata: Metadata = pageMetadata.signUp

export default function SignUpPage() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Create an account</h2>
      <p className="text-muted-foreground text-sm">Start your journey today</p>
      <div className="pt-2">
        <SignUpForm />
      </div>
    </div>
  )
}
