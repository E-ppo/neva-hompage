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
    position: [-5.0, 4.7, 1.1],
    lookAt: [-5.0, 4.5, -2.0],
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

export const CAMERA_POSITIONS_MOBILE: Record<SectionId, CameraPosition> = {
  [SECTION.HERO]: {
    position: [4.7, 7.6, 9.1],
    lookAt: [-3.8, 2.4, 0.6],
  },
  [SECTION.ABOUT]: {
    position: [0.3, 5.3, 4.3],
    lookAt: [-4.6, 3.0, 1.7],
  },
  [SECTION.PROJECTS]: {
    position: [-4.6, 5.2, 4.6],
    lookAt: [-4.7, 4.5, 1.4],
  },
  [SECTION.BLOG]: {
    position: [-2.4, 2.8, 1.7],
    lookAt: [-3.3, 2.6, 0.4],
  },
  [SECTION.CONTACT]: {
    position: [-2.9, 2.9, 2.0],
    lookAt: [-2.9, 0.4, 1.9],
  },
}

export const SECTION_ORDER: SectionId[] = [
  SECTION.HERO,
  SECTION.ABOUT,
  SECTION.PROJECTS,
  SECTION.BLOG,
  SECTION.CONTACT,
]
