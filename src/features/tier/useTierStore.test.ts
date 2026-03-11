import { describe, it, expect, beforeEach } from 'vitest'
import { useTierStore } from './useTierStore'
import { TIER } from './tier.types'

describe('useTierStore', () => {
  beforeEach(() => {
    useTierStore.setState({
      currentTier: TIER.MOBILE_2D,
      isDetecting: true,
      deviceInfo: null,
    })
  })

  it('has correct initial state', () => {
    const state = useTierStore.getState()
    expect(state.currentTier).toBe(TIER.MOBILE_2D)
    expect(state.isDetecting).toBe(true)
    expect(state.deviceInfo).toBeNull()
  })

  it('initializes tier, deviceInfo, and isDetecting in one call', () => {
    const info = { viewportWidth: 1440, gpuSupported: true, detectionMethod: 'webgl' as const }
    useTierStore.getState().initialize(TIER.DESKTOP_3D, info)

    const state = useTierStore.getState()
    expect(state.currentTier).toBe(TIER.DESKTOP_3D)
    expect(state.isDetecting).toBe(false)
    expect(state.deviceInfo).toEqual(info)
  })

  it('handles all tier types via initialize', () => {
    const info = { viewportWidth: 800, gpuSupported: true, detectionMethod: 'webgl' as const }

    useTierStore.getState().initialize(TIER.DESKTOP_3D, info)
    expect(useTierStore.getState().currentTier).toBe(TIER.DESKTOP_3D)

    useTierStore.getState().initialize(TIER.MOBILE_2D, info)
    expect(useTierStore.getState().currentTier).toBe(TIER.MOBILE_2D)
  })
})
