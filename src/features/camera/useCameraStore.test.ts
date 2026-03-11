import { describe, it, expect, beforeEach } from 'vitest'
import { useCameraStore } from './useCameraStore'
import { SECTION } from './camera.types'

describe('useCameraStore', () => {
  beforeEach(() => {
    useCameraStore.setState({
      currentSection: SECTION.HERO,
      isTransitioning: false,
    })
  })

  it('has correct initial state', () => {
    const state = useCameraStore.getState()
    expect(state.currentSection).toBe(SECTION.HERO)
    expect(state.isTransitioning).toBe(false)
  })

  it('flyTo sets section and marks transitioning', () => {
    useCameraStore.getState().flyTo(SECTION.PROJECTS)

    const state = useCameraStore.getState()
    expect(state.currentSection).toBe(SECTION.PROJECTS)
    expect(state.isTransitioning).toBe(true)
  })

  it('can manually clear transitioning via setState', () => {
    useCameraStore.getState().flyTo(SECTION.CONTACT)
    expect(useCameraStore.getState().isTransitioning).toBe(true)

    useCameraStore.setState({ isTransitioning: false })
    expect(useCameraStore.getState().isTransitioning).toBe(false)
  })
})
