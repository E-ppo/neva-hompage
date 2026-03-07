import { describe, it, expect } from 'vitest'
import { getPositionForProgress, getSectionForProgress, CAMERA_POSITIONS } from './cameraPositions'
import { SECTION } from './camera.types'

describe('getPositionForProgress', () => {
  it('returns hero position at progress 0', () => {
    const result = getPositionForProgress(0)
    expect(result.position).toEqual(CAMERA_POSITIONS[SECTION.HERO].position)
    expect(result.lookAt).toEqual(CAMERA_POSITIONS[SECTION.HERO].lookAt)
  })

  it('returns contact position at progress 1', () => {
    const result = getPositionForProgress(1)
    expect(result.position[0]).toBeCloseTo(CAMERA_POSITIONS[SECTION.CONTACT].position[0])
    expect(result.position[1]).toBeCloseTo(CAMERA_POSITIONS[SECTION.CONTACT].position[1])
    expect(result.position[2]).toBeCloseTo(CAMERA_POSITIONS[SECTION.CONTACT].position[2])
  })

  it('interpolates between sections at midpoint', () => {
    const result = getPositionForProgress(0.5)
    // At 0.5 with 4 sections (3 segments), segment=1.5 → index=1 (about→projects), t=0.5
    const about = CAMERA_POSITIONS[SECTION.ABOUT]
    const projects = CAMERA_POSITIONS[SECTION.PROJECTS]
    const expectedX = about.position[0] + (projects.position[0] - about.position[0]) * 0.5
    expect(result.position[0]).toBeCloseTo(expectedX)
  })

  it('clamps progress below 0', () => {
    const result = getPositionForProgress(-1)
    expect(result.position).toEqual(CAMERA_POSITIONS[SECTION.HERO].position)
  })

  it('clamps progress above 1', () => {
    const result = getPositionForProgress(2)
    expect(result.position[0]).toBeCloseTo(CAMERA_POSITIONS[SECTION.CONTACT].position[0])
  })
})

describe('getSectionForProgress', () => {
  it('returns hero at progress 0', () => {
    expect(getSectionForProgress(0)).toBe(SECTION.HERO)
  })

  it('returns contact at progress 1', () => {
    expect(getSectionForProgress(1)).toBe(SECTION.CONTACT)
  })

  it('returns about around progress 0.33', () => {
    expect(getSectionForProgress(0.33)).toBe(SECTION.ABOUT)
  })

  it('returns projects around progress 0.67', () => {
    expect(getSectionForProgress(0.67)).toBe(SECTION.PROJECTS)
  })

  it('clamps out-of-range values', () => {
    expect(getSectionForProgress(-0.5)).toBe(SECTION.HERO)
    expect(getSectionForProgress(1.5)).toBe(SECTION.CONTACT)
  })
})
