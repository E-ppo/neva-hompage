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
        <div className="absolute right-6 lg:right-12 top-14 bottom-4 pointer-events-auto flex items-center">
          <div
            className="rounded-2xl p-4 lg:p-6 backdrop-blur-md max-h-full overflow-y-auto"
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
