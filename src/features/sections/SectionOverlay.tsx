'use client'

import { useRef } from 'react'
import { useCameraStore } from '@/features/camera'
import { SECTION_ORDER } from '@/features/camera/cameraPositions'
import { events } from '@/lib/events'
import { AboutPanel } from './AboutPanel'
import { ContactPanel } from './ContactPanel'
import { BlogPanel } from './BlogPanel'

export function SectionOverlay() {
  const currentSection = useCameraStore((s) => s.currentSection)
  const isTransitioning = useCameraStore((s) => s.isTransitioning)
  const touchStartY = useRef(0)

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

  const isVisible = currentSection !== 'hero' && !isTransitioning

  return (
    <div
      className={`fixed inset-0 z-30 pointer-events-none transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {currentSection === 'about' && (
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

      {currentSection === 'blog' && !isTransitioning && (
        <div
          className="absolute inset-4 top-14 pointer-events-auto animate-intro-fade-up opacity-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <BlogPanel />
        </div>
      )}

      {currentSection === 'contact' && !isTransitioning && (
        <div
          className="absolute inset-4 top-14 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-y-1/2 pointer-events-auto flex items-center justify-center animate-intro-fade-up opacity-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ContactPanel />
        </div>
      )}
    </div>
  )
}
