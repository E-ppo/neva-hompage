import { create } from 'zustand'
import { TIER, type TierType, type DeviceInfo } from './tier.types'

interface TierStore {
  currentTier: TierType
  isDetecting: boolean
  deviceInfo: DeviceInfo | null
  initialize: (tier: TierType, deviceInfo: DeviceInfo) => void
}

export const useTierStore = create<TierStore>((set) => ({
  currentTier: TIER.MOBILE_2D,
  isDetecting: true,
  deviceInfo: null,
  initialize: (tier, deviceInfo) =>
    set({ currentTier: tier, deviceInfo, isDetecting: false }),
}))
