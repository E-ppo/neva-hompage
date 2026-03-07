import { TIER, type TierType, type DeviceInfo } from './tier.types'

const BREAKPOINTS = {
  DESKTOP: 1024,
  TABLET: 768,
} as const

function isSoftwareRenderer(gl: WebGLRenderingContext): boolean {
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
  if (!debugInfo) return false
  const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
  return /swiftshader|software|llvmpipe/i.test(renderer)
}

function detectGpu(): { supported: boolean; method: DeviceInfo['detectionMethod'] } {
  try {
    if (typeof document === 'undefined') {
      return { supported: false, method: 'none' }
    }

    const canvas = document.createElement('canvas')

    // WebGL2 우선 (Three.js r150+ 기본)
    const gl2 = canvas.getContext('webgl2')
    if (gl2) {
      if (isSoftwareRenderer(gl2)) {
        return { supported: false, method: 'none' }
      }
      return { supported: true, method: 'webgl' }
    }

    // WebGL1 폴백
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (gl) {
      if (isSoftwareRenderer(gl as WebGLRenderingContext)) {
        return { supported: false, method: 'none' }
      }
      return { supported: true, method: 'webgl' }
    }

    return { supported: false, method: 'none' }
  } catch {
    return { supported: false, method: 'none' }
  }
}

function getViewportWidth(): number {
  if (typeof window === 'undefined') return 0
  return window.innerWidth
}

export function detectTier(): { tier: TierType; deviceInfo: DeviceInfo } {
  try {
    const viewportWidth = getViewportWidth()
    const gpu = detectGpu()

    const deviceInfo: DeviceInfo = {
      viewportWidth,
      gpuSupported: gpu.supported,
      detectionMethod: gpu.method,
    }

    if (viewportWidth < BREAKPOINTS.TABLET) {
      return { tier: TIER.MOBILE_2D, deviceInfo }
    }

    if (!gpu.supported) {
      return { tier: TIER.MOBILE_2D, deviceInfo }
    }

    if (viewportWidth >= BREAKPOINTS.DESKTOP) {
      return { tier: TIER.DESKTOP_3D, deviceInfo }
    }

    return { tier: TIER.TABLET_3D_LITE, deviceInfo }
  } catch {
    return {
      tier: TIER.MOBILE_2D,
      deviceInfo: {
        viewportWidth: 0,
        gpuSupported: false,
        detectionMethod: 'none',
      },
    }
  }
}
