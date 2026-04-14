import { cn } from '@/lib/utils'
import { absoluteUrl, sleep } from '@/lib/utils'

describe('cn()', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('deduplicates Tailwind classes', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
  })
})

describe('absoluteUrl()', () => {
  it('uses the browser origin when window is available', () => {
    expect(absoluteUrl('/dashboard')).toBe('http://localhost/dashboard')
  })
})

describe('sleep()', () => {
  it('resolves after the given delay', async () => {
    jest.useFakeTimers()
    const onResolved = jest.fn()

    const promise = sleep(100).then(onResolved)
    jest.advanceTimersByTime(99)
    await Promise.resolve()

    expect(onResolved).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    await promise

    expect(onResolved).toHaveBeenCalledTimes(1)
    jest.useRealTimers()
  })
})
