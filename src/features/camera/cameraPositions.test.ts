import { describe, it, expect } from 'vitest'
import { CAMERA_POSITIONS, SECTION_ORDER } from './cameraPositions'
import { SECTION } from './camera.types'

describe('CAMERA_POSITIONS', () => {
  it('has a position for every section in SECTION_ORDER', () => {
    for (const section of SECTION_ORDER) {
      expect(CAMERA_POSITIONS[section]).toBeDefined()
      expect(CAMERA_POSITIONS[section].position).toHaveLength(3)
      expect(CAMERA_POSITIONS[section].lookAt).toHaveLength(3)
    }
  })

  it('SECTION_ORDER starts with HERO and ends with CONTACT', () => {
    expect(SECTION_ORDER[0]).toBe(SECTION.HERO)
    expect(SECTION_ORDER[SECTION_ORDER.length - 1]).toBe(SECTION.CONTACT)
  })

  it('has all 5 sections', () => {
    expect(SECTION_ORDER).toHaveLength(5)
  })
})
