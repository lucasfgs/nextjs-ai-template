import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata } from '@/config/page-metadata'
import { verifyEmailAction } from '@/modules/auth'

export const metadata: Metadata = pageMetadata.verifyEmail

interface VerifyEmailPageProps {
  searchParams: Promise<{ token?: string }>
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const { token } = await searchParams

  if (!token) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-destructive text-sm">Invalid verification link.</p>
        <Link href="/sign-in" className="text-sm underline underline-offset-4">
          Back to sign in
        </Link>
      </div>
    )
  }

  const formData = new FormData()
  formData.append('token', token)
  const result = await verifyEmailAction({}, formData)

  return (
    <div className="space-y-4 text-center">
      {result.success ? (
        <>
          <p className="text-sm text-green-600 dark:text-green-400">{result.success}</p>
          <Link href="/sign-in" className="text-sm underline underline-offset-4">
            Sign in
          </Link>
        </>
      ) : (
        <>
          <p className="text-destructive text-sm">{result.error}</p>
          <Link href="/sign-in" className="text-sm underline underline-offset-4">
            Back to sign in
          </Link>
        </>
      )}
    </div>
  )
}
