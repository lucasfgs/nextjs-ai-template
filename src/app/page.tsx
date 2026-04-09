import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight">
        {process.env.NEXT_PUBLIC_APP_NAME ?? 'My App'}
      </h1>
      <p className="text-muted-foreground max-w-md">
        A production-ready Next.js starter with authentication, type-safe database access, and
        modular architecture.
      </p>
      <div className="flex gap-3">
        <Link
          href="/sign-in"
          className="bg-foreground text-background rounded-md px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
        >
          Sign in
        </Link>
        <Link
          href="/sign-up"
          className="hover:bg-accent rounded-md border px-5 py-2.5 text-sm font-medium transition-colors"
        >
          Get started
        </Link>
      </div>
    </main>
  )
}
