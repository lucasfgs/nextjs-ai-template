import type { Metadata } from 'next'
import { getPageMetadata } from '@/config/page-metadata'
import { getRequestI18n, getRequestLocale } from '@/modules/i18n'
import { SignUpForm } from '@/modules/auth'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return getPageMetadata(locale).signUp
}

export default async function SignUpPage() {
  const { messages } = await getRequestI18n()

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">{messages.auth.pages.signUp.title}</h2>
      <p className="text-muted-foreground text-sm">{messages.auth.pages.signUp.description}</p>
      <div className="pt-2">
        <SignUpForm />
      </div>
    </div>
  )
}
