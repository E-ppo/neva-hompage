import { describe, it, expect, vi, beforeEach } from 'vitest'
import { detectTier } from './useTierDetection'
import { TIER } from './tier.types'

function setViewportWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', { value: width, writable: true })
}

function mockWebGL(options?: { renderer?: string }) {
  const UNMASKED_RENDERER_WEBGL = 0x9246
  const mockGl = {
    getExtension: (name: string) =>
      name === 'WEBGL_debug_renderer_info' ? { UNMASKED_RENDERER_WEBGL } : null,
    getParameter: (param: number) =>
      param === UNMASKED_RENDERER_WEBGL ? (options?.renderer ?? 'ANGLE (NVIDIA GeForce)') : null,
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(mockGl as any)
}

function mockWebGLUnsupported() {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
}

describe('detectTier', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    setViewportWidth(1440)
    mockWebGL()
  })

  it('returns DESKTOP_3D for wide viewport with GPU support', () => {
    const { tier, deviceInfo } = detectTier()
    expect(tier).toBe(TIER.DESKTOP_3D)
    expect(deviceInfo.gpuSupported).toBe(true)
    expect(deviceInfo.viewportWidth).toBe(1440)
  })

  it('returns DESKTOP_3D for 1024px viewport with GPU support', () => {
    setViewportWidth(1024)
    const { tier } = detectTier()
    expect(tier).toBe(TIER.DESKTOP_3D)
  })

  it('returns TABLET_3D_LITE for tablet viewport with GPU support', () => {
    setViewportWidth(800)
    const { tier, deviceInfo } = detectTier()
    expect(tier).toBe(TIER.TABLET_3D_LITE)
    expect(deviceInfo.viewportWidth).toBe(800)
  })

  it('returns TABLET_3D_LITE for 768px viewport with GPU support', () => {
    setViewportWidth(768)
    const { tier } = detectTier()
    expect(tier).toBe(TIER.TABLET_3D_LITE)
  })

  it('returns MOBILE_2D for mobile viewport regardless of GPU', () => {
    setViewportWidth(375)
    const { tier, deviceInfo } = detectTier()
    expect(tier).toBe(TIER.MOBILE_2D)
    expect(deviceInfo.viewportWidth).toBe(375)
  })

  it('returns MOBILE_2D for 767px viewport', () => {
    setViewportWidth(767)
    const { tier } = detectTier()
    expect(tier).toBe(TIER.MOBILE_2D)
  })

  it('returns MOBILE_2D when GPU is not supported on desktop', () => {
    setViewportWidth(1440)
    mockWebGLUnsupported()
    const { tier, deviceInfo } = detectTier()
    expect(tier).toBe(TIER.MOBILE_2D)
    expect(deviceInfo.gpuSupported).toBe(false)
    expect(deviceInfo.detectionMethod).toBe('none')
  })

  it('returns MOBILE_2D when GPU detection throws an error', () => {
    setViewportWidth(1440)
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => {
      throw new Error('WebGL crash')
    })
    const { tier, deviceInfo } = detectTier()
    expect(tier).toBe(TIER.MOBILE_2D)
    expect(deviceInfo.gpuSupported).toBe(false)
  })

  it('returns MOBILE_2D for software renderer (SwiftShader)', () => {
    setViewportWidth(1440)
    mockWebGL({ renderer: 'Google SwiftShader' })
    const { tier, deviceInfo } = detectTier()
    expect(tier).toBe(TIER.MOBILE_2D)
    expect(deviceInfo.gpuSupported).toBe(false)
  })

  it('detects WebGL when available', () => {
    setViewportWidth(1024)
    const { deviceInfo } = detectTier()
    expect(deviceInfo.detectionMethod).toBe('webgl')
    expect(deviceInfo.gpuSupported).toBe(true)
  })
})
