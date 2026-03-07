'use client'

import { lazy, Suspense, useState, useEffect } from 'react'
import { IntroLayer } from '@/features/intro'
import { ErrorBoundary3D } from '@/components/ErrorBoundary3D'
import { useTierStore } from '@/features/tier'
import { TIER } from '@/features/tier'
import { events } from '@/lib/events'

const SceneCanvas = lazy(() =>
  import('@/features/scene/SceneCanvas').then((m) => ({ default: m.SceneCanvas })),
)

const SECTION_COUNT = 4

export default function Home() {
  const [sceneReady, setSceneReady] = useState(false)
  const currentTier = useTierStore((s) => s.currentTier)
  const isDetecting = useTierStore((s) => s.isDetecting)

  const isMobile = !isDetecting && currentTier === TIER.MOBILE_2D

  useEffect(() => {
    const handler = () => setSceneReady(true)
    events.on('scene:loaded', handler)
    return () => events.off('scene:loaded', handler)
  }, [])

  return (
    <main className="relative bg-bg-deep text-text-primary">
      <IntroLayer isSceneReady={sceneReady} />

      {!isMobile && (
        <ErrorBoundary3D>
          <Suspense fallback={null}>
            <SceneCanvas />
          </Suspense>
        </ErrorBoundary3D>
      )}

      {/* Scroll container for ScrollTrigger */}
      <div
        id="scroll-container"
        style={{ height: `${SECTION_COUNT * 100}vh` }}
        className="relative z-10"
      >
        {/* Section placeholders for scroll height */}
        {Array.from({ length: SECTION_COUNT }).map((_, i) => (
          <section key={i} className="h-screen" />
        ))}
      </div>
    </main>
  )
}
