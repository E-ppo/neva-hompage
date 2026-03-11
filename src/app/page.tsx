'use client'

import { lazy, Suspense, useState, useEffect } from 'react'
import { IntroLayer } from '@/features/intro'
import { ErrorBoundary3D } from '@/components/ErrorBoundary3D'
import { useTierStore } from '@/features/tier'
import { TIER } from '@/features/tier'
import { events } from '@/lib/events'
import { FloatingNav } from '@/features/navigation'
import { MobileFallback } from '@/features/fallback'

const SceneCanvas = lazy(() =>
  import('@/features/scene/SceneCanvas').then((m) => ({ default: m.SceneCanvas })),
)

export default function Home() {
  const [sceneReady, setSceneReady] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)
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
      <IntroLayer isSceneReady={sceneReady} onComplete={() => setIntroComplete(true)} />

      {isMobile ? (
        introComplete && <MobileFallback />
      ) : (
        <ErrorBoundary3D>
          <Suspense fallback={null}>
            <SceneCanvas />
          </Suspense>
        </ErrorBoundary3D>
      )}

      {introComplete && !isMobile && <FloatingNav />}
    </main>
  )
}
