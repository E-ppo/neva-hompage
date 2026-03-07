import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

vi.mock('gsap', () => ({
  default: {
    context: () => ({ revert: vi.fn() }),
    set: vi.fn(),
    timeline: () => ({ from: vi.fn().mockReturnThis() }),
  },
}))

import { useIntroAnimation } from './useIntroAnimation'

describe('useIntroAnimation', () => {
  it('returns a containerRef', () => {
    const { result } = renderHook(() => useIntroAnimation())
    expect(result.current.containerRef).toBeDefined()
    expect(result.current.containerRef.current).toBeNull()
  })
})
