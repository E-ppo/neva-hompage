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

const SECTION_ORDER: SectionId[] = [
  SECTION.HERO,
  SECTION.ABOUT,
  SECTION.PROJECTS,
  SECTION.BLOG,
  SECTION.CONTACT,
]

export function getPositionForProgress(progress: number): CameraPosition {
  const clampedProgress = Math.max(0, Math.min(1, progress))
  const totalSegments = SECTION_ORDER.length - 1
  const segment = clampedProgress * totalSegments
  const index = Math.min(Math.floor(segment), totalSegments - 1)
  const t = segment - index

  const from = CAMERA_POSITIONS[SECTION_ORDER[index]]
  const to = CAMERA_POSITIONS[SECTION_ORDER[index + 1]] ?? from

  return {
    position: [
      from.position[0] + (to.position[0] - from.position[0]) * t,
      from.position[1] + (to.position[1] - from.position[1]) * t,
      from.position[2] + (to.position[2] - from.position[2]) * t,
    ],
    lookAt: [
      from.lookAt[0] + (to.lookAt[0] - from.lookAt[0]) * t,
      from.lookAt[1] + (to.lookAt[1] - from.lookAt[1]) * t,
      from.lookAt[2] + (to.lookAt[2] - from.lookAt[2]) * t,
    ],
  }
}

export function getSectionForProgress(progress: number): SectionId {
  const clampedProgress = Math.max(0, Math.min(1, progress))
  const index = Math.min(
    Math.round(clampedProgress * (SECTION_ORDER.length - 1)),
    SECTION_ORDER.length - 1,
  )
  return SECTION_ORDER[index]
}
