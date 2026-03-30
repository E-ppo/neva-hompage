'use client'

import { useEffect, useState, useCallback } from 'react'
import { useCameraStore } from '@/features/camera'

interface ScreenBounds {
  left: number
  top: number
  width: number
  height: number
}

/**
 * 3D 메시의 스크린 좌표를 이벤트로 받아 state로 관리
 * Canvas 바깥(HTML)에서 사용
 */
export function useMeshScreenBounds() {
  const [bounds, setBounds] = useState<ScreenBounds | null>(null)
  const currentSection = useCameraStore((s) => s.currentSection)
  const isTransitioning = useCameraStore((s) => s.isTransitioning)

  const handleBoundsUpdate = useCallback((e: CustomEvent<ScreenBounds>) => {
    console.log('[useMeshScreenBounds] received:', e.detail)
    setBounds(e.detail)
  }, [])

  useEffect(() => {
    window.addEventListener('mesh:screen-bounds' as any, handleBoundsUpdate)
    return () => window.removeEventListener('mesh:screen-bounds' as any, handleBoundsUpdate)
  }, [handleBoundsUpdate])

  const isVisible = currentSection === 'projects' && !isTransitioning

  return { bounds, isVisible }
}
