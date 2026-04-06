// GA4 스크롤 깊이 추적 — 섹션 기반 SPA용
// 섹션 진행도를 스크롤 깊이 마일스톤(25/50/75/100%)으로 매핑
'use client'

import { useEffect, useRef } from 'react'
import { useCameraStore } from '@/features/camera'
import { SECTION_ORDER } from '@/features/camera/cameraPositions'
import { trackScrollDepth } from '@/lib/analytics'

const MILESTONES = [25, 50, 75, 100] as const

export function useScrollDepth() {
  const currentSection = useCameraStore((s) => s.currentSection)
  const fired = useRef(new Set<number>())

  useEffect(() => {
    const index = SECTION_ORDER.indexOf(currentSection)
    if (index <= 0) return

    // 섹션 인덱스를 퍼센트로 변환 (hero=0%, contact=100%)
    const percent = Math.round((index / (SECTION_ORDER.length - 1)) * 100)

    for (const milestone of MILESTONES) {
      if (percent >= milestone && !fired.current.has(milestone)) {
        fired.current.add(milestone)
        trackScrollDepth(milestone)
      }
    }
  }, [currentSection])
}
