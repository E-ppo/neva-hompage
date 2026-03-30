'use client'

import { useRef } from 'react'
import { useCameraStore } from '@/features/camera'
import { SECTION_ORDER } from '@/features/camera/cameraPositions'
import { events } from '@/lib/events'

function useSwipeNav() {
  const touchStartY = useRef(0)

  const navigate = (deltaY: number) => {
    if (Math.abs(deltaY) < 50) return
    const store = useCameraStore.getState()
    if (store.isTransitioning) return
    const idx = SECTION_ORDER.indexOf(store.currentSection)
    if (idx === -1) return
    const next = deltaY > 0
      ? (idx + 1) % SECTION_ORDER.length
      : (idx - 1 + SECTION_ORDER.length) % SECTION_ORDER.length
    events.emit('camera:flyTo', SECTION_ORDER[next])
  }

  const onWheel = (e: React.WheelEvent) => {
    e.stopPropagation()
    navigate(e.deltaY)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    navigate(touchStartY.current - e.changedTouches[0].clientY)
  }

  return { onWheel, onTouchStart, onTouchEnd }
}

export function BlogPanel() {
  const nav = useSwipeNav()

  return (
    <div className="w-full h-full flex flex-col" {...nav}>
      {/* 타이틀바 */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 rounded-t-lg"
        style={{ background: '#1a1a1a' }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="text-[10px] sm:text-xs text-white/40 ml-2 font-mono">blog.sh</span>
      </div>

      {/* 터미널 본체 */}
      <div
        className="rounded-b-lg px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6 font-mono flex-1"
        style={{
          background: '#0d0d0d',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <p className="text-[#4ade80] text-xs sm:text-sm">
            <span className="text-[#888]">$</span> cat blog --status
          </p>
          <p className="text-[#4ade80]/70 text-xs sm:text-sm">
            &gt; Coming soon...
          </p>
          <p className="text-[#4ade80] text-xs sm:text-sm animate-pulse">
            &gt; <span className="inline-block w-1.5 h-3.5 sm:h-4 bg-[#4ade80] align-middle" />
          </p>
        </div>
      </div>
    </div>
  )
}
