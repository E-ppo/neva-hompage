import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TierProvider } from './TierProvider'
import { useTierStore } from './useTierStore'
import { TIER } from './tier.types'

vi.mock('./useTierDetection', () => ({
  detectTier: vi.fn(() => ({
    tier: TIER.DESKTOP_3D,
    deviceInfo: { viewportWidth: 1440, gpuSupported: true, detectionMethod: 'webgl' as const },
  })),
}))

describe('TierProvider', () => {
  beforeEach(() => {
    useTierStore.setState({
      currentTier: TIER.MOBILE_2D,
      isDetecting: true,
      deviceInfo: null,
    })
  })

  it('renders children', () => {
    render(
      <TierProvider>
        <div data-testid="child">Hello</div>
      </TierProvider>,
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('sets tier in store after detection', async () => {
    render(
      <TierProvider>
        <div>Test</div>
      </TierProvider>,
    )

    // useEffect runs asynchronously
    await vi.waitFor(() => {
      const state = useTierStore.getState()
      expect(state.currentTier).toBe(TIER.DESKTOP_3D)
      expect(state.isDetecting).toBe(false)
      expect(state.deviceInfo).not.toBeNull()
    })
  })
})
