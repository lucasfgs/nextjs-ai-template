/** @jest-environment node */

import { absoluteUrl } from '@/lib/utils'

describe('absoluteUrl() on the server', () => {
  it('falls back to NEXT_PUBLIC_APP_URL when window is unavailable', () => {
    const originalAppUrl = process.env.NEXT_PUBLIC_APP_URL
    process.env.NEXT_PUBLIC_APP_URL = 'https://example.com'

    expect(absoluteUrl('/settings')).toBe('https://example.com/settings')

    process.env.NEXT_PUBLIC_APP_URL = originalAppUrl
  })
})
