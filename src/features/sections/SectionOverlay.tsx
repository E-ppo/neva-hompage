'use client'

import { useRef, useEffect } from 'react'
import { useCameraStore } from '@/features/camera'
import { SECTION_ORDER } from '@/features/camera/cameraPositions'
import { events } from '@/lib/events'
import { trackSectionView } from '@/lib/analytics'
import { useScrollDepth } from '@/lib/useScrollDepth'
import { AboutPanel } from './AboutPanel'
import { ContactPanel } from './ContactPanel'
import { BlogPanel } from './BlogPanel'
import { ProjectsPanel } from './ProjectsPanel'

export function SectionOverlay() {
  const currentSection = useCameraStore((s) => s.currentSection)
  const isTransitioning = useCameraStore((s) => s.isTransitioning)
  const touchStartY = useRef(0)

  // GA4: 섹션 기반 스크롤 깊이 추적
  useScrollDepth()

  // GA4: 섹션 진입 시 section_view 이벤트 전송
  useEffect(() => {
    if (currentSection && !isTransitioning) {
      trackSectionView(currentSection)
    }
  }, [currentSection, isTransitioning])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(deltaY) < 50) return

    const store = useCameraStore.getState()
    if (store.isTransitioning) return

    const currentIndex = SECTION_ORDER.indexOf(store.currentSection)
    if (currentIndex === -1) return

    const nextIndex =
      deltaY > 0
        ? (currentIndex + 1) % SECTION_ORDER.length
        : (currentIndex - 1 + SECTION_ORDER.length) % SECTION_ORDER.length

    events.emit('camera:flyTo', SECTION_ORDER[nextIndex])
  }


  return (
    <div
      className="fixed inset-0 z-30 pointer-events-none"
    >
      {currentSection === 'about' && !isTransitioning && (
        <div
          className="absolute inset-4 top-14 md:inset-auto md:right-6 lg:right-12 md:top-14 md:bottom-4 pointer-events-auto flex items-center justify-center md:justify-end"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="rounded-2xl p-3 sm:p-4 lg:p-6 backdrop-blur-md max-h-full overflow-y-auto"
            style={{
              background: 'rgba(15, 13, 11, 0.75)',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            <AboutPanel />
          </div>
        </div>
      )}

      {currentSection === 'projects' && !isTransitioning && (
        <div
          className="absolute inset-4 top-14 pointer-events-auto"
          onWheel={(e) => {
            const store = useCameraStore.getState()
            if (store.isTransitioning) return
            const currentIndex = SECTION_ORDER.indexOf(store.currentSection)
            if (currentIndex === -1) return
            const nextIndex =
              e.deltaY > 0
                ? (currentIndex + 1) % SECTION_ORDER.length
                : (currentIndex - 1 + SECTION_ORDER.length) % SECTION_ORDER.length
            events.emit('camera:flyTo', SECTION_ORDER[nextIndex])
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ProjectsPanel />
        </div>
      )}

      {currentSection === 'blog' && !isTransitioning && (
        <div
          className="absolute inset-4 top-14 pointer-events-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <BlogPanel />
        </div>
      )}

      {currentSection === 'contact' && !isTransitioning && (
        <div
          className="absolute inset-4 top-14 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-y-1/2 pointer-events-auto flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ContactPanel />
        </div>
      )}
    </div>
  )
}
