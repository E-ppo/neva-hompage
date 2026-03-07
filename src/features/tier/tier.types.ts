export const TIER = {
  DESKTOP_3D: 'DESKTOP_3D',
  TABLET_3D_LITE: 'TABLET_3D_LITE',
  MOBILE_2D: 'MOBILE_2D',
} as const

export type TierType = (typeof TIER)[keyof typeof TIER]

export interface DeviceInfo {
  viewportWidth: number
  gpuSupported: boolean
  detectionMethod: 'webgpu' | 'webgl' | 'none'
}

export interface TierState {
  currentTier: TierType
  isDetecting: boolean
  deviceInfo: DeviceInfo | null
}
