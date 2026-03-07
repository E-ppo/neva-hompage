'use client'

import { useEffect, type ReactNode } from 'react'
import { detectTier } from './useTierDetection'
import { useTierStore } from './useTierStore'

export function TierProvider({ children }: { children: ReactNode }) {
  const initialize = useTierStore((s) => s.initialize)

  useEffect(() => {
    const { tier, deviceInfo } = detectTier()
    initialize(tier, deviceInfo)
  }, [initialize])

  return <>{children}</>
}
