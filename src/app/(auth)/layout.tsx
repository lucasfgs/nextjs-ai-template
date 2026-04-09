import { APP_CONFIG } from '@/lib/constants'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{APP_CONFIG.NAME}</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
