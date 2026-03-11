import type { Vector3Tuple } from 'three'

export const SECTION = {
  HERO: 'hero',
  ABOUT: 'about',
  PROJECTS: 'projects',
  BLOG: 'blog',
  CONTACT: 'contact',
} as const

export type SectionId = (typeof SECTION)[keyof typeof SECTION]

export interface CameraPosition {
  position: Vector3Tuple
  lookAt: Vector3Tuple
}
