'use client'

import { renderHook, act } from '@testing-library/react'
import { useMediaQuery } from '@/hooks/use-media-query'

type Listener = () => void

describe('useMediaQuery()', () => {
  it('subscribes to matchMedia updates and returns the latest match state', () => {
    let matches = false
    const listeners = new Set<Listener>()
    const addEventListener = jest.fn((_event: string, listener: Listener) =>
      listeners.add(listener),
    )
    const removeEventListener = jest.fn((_event: string, listener: Listener) =>
      listeners.delete(listener),
    )

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        get matches() {
          return matches
        },
        addEventListener,
        removeEventListener,
      })),
    })

    const { result, unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    expect(result.current).toBe(false)
    expect(addEventListener).toHaveBeenCalledWith('change', expect.any(Function))

    act(() => {
      matches = true
      listeners.forEach((listener) => listener())
    })

    expect(result.current).toBe(true)

    unmount()
    expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
