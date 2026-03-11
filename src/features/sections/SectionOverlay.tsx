'use client'

import { useCameraStore } from '@/features/camera'
import { AboutPanel } from './AboutPanel'

export function SectionOverlay() {
  const currentSection = useCameraStore((s) => s.currentSection)
  const isTransitioning = useCameraStore((s) => s.isTransitioning)

  const isVisible = currentSection !== 'hero' && !isTransitioning

  return (
    <div
      className={`fixed inset-0 z-30 pointer-events-none transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {currentSection === 'about' && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-auto">
          <div
            className="rounded-2xl p-8 backdrop-blur-md"
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
    </div>
  )
}
