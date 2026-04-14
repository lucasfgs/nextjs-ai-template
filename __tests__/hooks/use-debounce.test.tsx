'use client'

import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/hooks/use-debounce'

describe('useDebounce()', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('keeps the previous value until the delay elapses', () => {
    jest.useFakeTimers()
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 200 },
    })

    expect(result.current).toBe('initial')

    rerender({ value: 'updated', delay: 200 })
    expect(result.current).toBe('initial')

    act(() => {
      jest.advanceTimersByTime(199)
    })
    expect(result.current).toBe('initial')

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current).toBe('updated')
  })

  it('cancels the previous timer when the value changes again', () => {
    jest.useFakeTimers()
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'first', delay: 100 },
    })

    rerender({ value: 'second', delay: 100 })
    act(() => {
      jest.advanceTimersByTime(50)
    })

    rerender({ value: 'third', delay: 100 })
    act(() => {
      jest.advanceTimersByTime(50)
    })
    expect(result.current).toBe('first')

    act(() => {
      jest.advanceTimersByTime(50)
    })
    expect(result.current).toBe('third')
  })
})
