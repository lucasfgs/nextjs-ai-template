import Link from 'next/link'
import { APP_CONFIG, ROUTES } from '@/lib/constants'
import { templateContent } from '../template-content'

export function TemplateHomeHero() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="space-y-3">
        <p className="text-primary text-sm font-medium tracking-[0.25em] uppercase">
          {templateContent.home.eyebrow}
        </p>
        <h1 className="text-4xl font-bold tracking-tight">{APP_CONFIG.NAME}</h1>
        <p className="text-muted-foreground max-w-2xl">
          {APP_CONFIG.DESCRIPTION} {templateContent.home.titleSuffix}
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          href={ROUTES.SIGN_IN}
          className="bg-foreground text-background rounded-md px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
        >
          Sign in
        </Link>
        <Link
          href={ROUTES.SIGN_UP}
          className="hover:bg-accent rounded-md border px-5 py-2.5 text-sm font-medium transition-colors"
        >
          Get started
        </Link>
      </div>
    </main>
  )
}
