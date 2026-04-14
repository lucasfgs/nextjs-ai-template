import type { ReactNode } from 'react'
import { LocaleSwitcher } from '@/components/common/locale-switcher'
import { APP_CONFIG } from '@/lib/constants'

type Props = {
  children: ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex justify-end">
          <LocaleSwitcher />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{APP_CONFIG.NAME}</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
