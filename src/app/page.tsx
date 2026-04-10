import Link from 'next/link'
import { APP_CONFIG, ROUTES } from '@/lib/constants'

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="space-y-3">
        <p className="text-primary text-sm font-medium uppercase tracking-[0.25em]">
          AI orchestration starter
        </p>
        <h1 className="text-4xl font-bold tracking-tight">{APP_CONFIG.NAME}</h1>
        <p className="text-muted-foreground max-w-2xl">
          {APP_CONFIG.DESCRIPTION} Use this template to bootstrap new products with a clear module
          structure, strong auth foundations, and AI-friendly project context.
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
