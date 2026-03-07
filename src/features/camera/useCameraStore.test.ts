import { describe, it, expect, beforeEach } from 'vitest'
import { useCameraStore } from './useCameraStore'
import { SECTION } from './camera.types'

describe('useCameraStore', () => {
  beforeEach(() => {
    useCameraStore.getState().reset()
  })

  it('has correct initial state', () => {
    const state = useCameraStore.getState()
    expect(state.currentSection).toBe(SECTION.HERO)
    expect(state.isTransitioning).toBe(false)
    expect(state.scrollProgress).toBe(0)
  })

  it('flyTo sets section and marks transitioning', () => {
    useCameraStore.getState().flyTo(SECTION.PROJECTS)

    const state = useCameraStore.getState()
    expect(state.currentSection).toBe(SECTION.PROJECTS)
    expect(state.isTransitioning).toBe(true)
  })

  it('setProgress updates scroll progress', () => {
    useCameraStore.getState().setProgress(0.5)
    expect(useCameraStore.getState().scrollProgress).toBe(0.5)
  })

  it('setTransitioning updates transition flag', () => {
    useCameraStore.getState().setTransitioning(true)
    expect(useCameraStore.getState().isTransitioning).toBe(true)

    useCameraStore.getState().setTransitioning(false)
    expect(useCameraStore.getState().isTransitioning).toBe(false)
  })

  it('reset restores initial state', () => {
    useCameraStore.getState().flyTo(SECTION.CONTACT)
    useCameraStore.getState().setProgress(0.8)
    useCameraStore.getState().reset()

    const state = useCameraStore.getState()
    expect(state.currentSection).toBe(SECTION.HERO)
    expect(state.isTransitioning).toBe(false)
    expect(state.scrollProgress).toBe(0)
  })
})
