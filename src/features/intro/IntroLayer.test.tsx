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
      from: vi.fn().mockReturnThis(),
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

  it('renders eppo name in Layer 1', () => {
    render(<IntroLayer />)
    expect(screen.getByText('eppo')).toBeInTheDocument()
  })

  it('renders Frontend Developer title', () => {
    render(<IntroLayer />)
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
  })

  it('renders technology keywords', () => {
    render(<IntroLayer />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Three.js')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('has aria-label for accessibility', () => {
    render(<IntroLayer />)
    expect(screen.getByLabelText('인트로')).toBeInTheDocument()
  })

  it('transitions to complete state when scene is ready', async () => {
    const { rerender } = render(<IntroLayer isSceneReady={false} />)
    rerender(<IntroLayer isSceneReady={true} />)

    const section = screen.getByLabelText('인트로')
    expect(section.className).toContain('opacity-0')
  })
})
