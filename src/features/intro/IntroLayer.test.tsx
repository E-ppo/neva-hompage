import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { IntroLayer } from './IntroLayer'
import { useTierStore } from '@/features/tier'
import { TIER } from '@/features/tier'

vi.mock('gsap', () => ({
  default: {
    context: () => ({ revert: vi.fn() }),
    set: vi.fn(),
    timeline: () => ({
      to: vi.fn().mockReturnThis(),
    }),
  },
}))

describe('IntroLayer', () => {
  beforeEach(() => {
    useTierStore.setState({
      currentTier: TIER.DESKTOP_3D,
      isDetecting: false,
      deviceInfo: { viewportWidth: 1440, gpuSupported: true, detectionMethod: 'webgl' },
    })
  })

  it('renders NEVA name', () => {
    render(<IntroLayer />)
    expect(screen.getByText('NEVA')).toBeInTheDocument()
  })

  it('renders tagline', () => {
    render(<IntroLayer />)
    expect(screen.getByText('From blank canvas to living interface.')).toBeInTheDocument()
  })

  it('has aria-label for accessibility', () => {
    render(<IntroLayer />)
    expect(screen.getByLabelText('인트로')).toBeInTheDocument()
  })
})
