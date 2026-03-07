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
  TIER: { DESKTOP_3D: 'DESKTOP_3D', TABLET_3D_LITE: 'TABLET_3D_LITE', MOBILE_2D: 'MOBILE_2D' },
}))

vi.mock('@/lib/events', () => ({
  events: {
    emit: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  },
}))

describe('Home page', () => {
  it('renders the intro with eppo name', () => {
    render(<Home />)
    expect(screen.getByText('eppo')).toBeInTheDocument()
  })

  it('renders the developer title', () => {
    render(<Home />)
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
  })

  it('renders scroll container with section placeholders', () => {
    render(<Home />)
    const scrollContainer = document.getElementById('scroll-container')
    expect(scrollContainer).toBeInTheDocument()
  })
})
