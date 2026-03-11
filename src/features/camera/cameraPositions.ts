import { SECTION, type SectionId, type CameraPosition } from './camera.types'

export const CAMERA_POSITIONS: Record<SectionId, CameraPosition> = {
  [SECTION.HERO]: {
    position: [6, 6, 10],
    lookAt: [0, 3, 0],
  },
  [SECTION.ABOUT]: {
    position: [-0.4, 3.5, 3.2],
    lookAt: [-8.8, 1.8, -2.0],
  },
  [SECTION.PROJECTS]: {
    position: [-3.7, 4.8, 0.8],
    lookAt: [-3.6, 4.6, -9.2],
  },
  [SECTION.BLOG]: {
    position: [-3.5, 2.65, 0.2],
    lookAt: [-7.8, 0.25, -8.6],
  },
  [SECTION.CONTACT]: {
    position: [-2.3, 4.1, 1.9],
    lookAt: [-2.3, -5.8, 1.5],
  },
}

export const SECTION_ORDER: SectionId[] = [
  SECTION.HERO,
  SECTION.ABOUT,
  SECTION.PROJECTS,
  SECTION.BLOG,
  SECTION.CONTACT,
]
