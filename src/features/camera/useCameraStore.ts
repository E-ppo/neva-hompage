import { create } from 'zustand'
import { SECTION, type CameraStore } from './camera.types'

export const useCameraStore = create<CameraStore>((set) => ({
  currentSection: SECTION.HERO,
  isTransitioning: false,
  scrollProgress: 0,

  flyTo: (section) =>
    set({ currentSection: section, isTransitioning: true }),

  setProgress: (progress) =>
    set({ scrollProgress: progress }),

  setTransitioning: (transitioning) =>
    set({ isTransitioning: transitioning }),

  reset: () =>
    set({
      currentSection: SECTION.HERO,
      isTransitioning: false,
      scrollProgress: 0,
    }),
}))
