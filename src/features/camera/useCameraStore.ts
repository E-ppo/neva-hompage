import { create } from 'zustand'
import { SECTION } from './camera.types'
import type { SectionId } from './camera.types'

interface CameraStore {
  currentSection: SectionId
  isTransitioning: boolean
  flyTo: (section: SectionId) => void
}

export const useCameraStore = create<CameraStore>((set) => ({
  currentSection: SECTION.HERO,
  isTransitioning: false,

  flyTo: (section) =>
    set({ currentSection: section, isTransitioning: true }),
}))
