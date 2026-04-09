export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{process.env.NEXT_PUBLIC_APP_NAME ?? 'My App'}</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
