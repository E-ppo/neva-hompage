import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from './page'

vi.mock('gsap', () => ({
  default: {
    context: () => ({ revert: vi.fn() }),
    set: vi.fn(),
    timeline: () => ({
      to: vi.fn().mockReturnThis(),
    }),
  },
}))

vi.mock('@/features/tier', () => ({
  useTierStore: (selector: (s: Record<string, unknown>) => unknown) =>
    selector({ currentTier: 'MOBILE_2D', isDetecting: false, initialize: vi.fn() }),
  TIER: { DESKTOP_3D: 'DESKTOP_3D', MOBILE_2D: 'MOBILE_2D' },
}))

vi.mock('@/lib/events', () => ({
  events: {
    emit: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  },
}))

describe('Home page', () => {
  it('renders NEVA name', () => {
    render(<Home />)
    const elements = screen.getAllByText('NEVA')
    expect(elements.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the intro section', () => {
    render(<Home />)
    expect(screen.getByLabelText('인트로')).toBeInTheDocument()
  })
})
