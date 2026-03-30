'use client'

import { lazy, Suspense, useState, useEffect } from 'react'
import { IntroLayer } from '@/features/intro'
import { ErrorBoundary3D } from '@/components/ErrorBoundary3D'
import { events } from '@/lib/events'
import { FloatingNav } from '@/features/navigation'
import { SectionOverlay } from '@/features/sections'

const SceneCanvas = lazy(() =>
  import('@/features/scene/SceneCanvas').then((m) => ({ default: m.SceneCanvas })),
)

export default function Home() {
  const [sceneReady, setSceneReady] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const handler = () => setSceneReady(true)
    events.on('scene:loaded', handler)
    return () => events.off('scene:loaded', handler)
  }, [])

  return (
    <main className="relative bg-bg-deep text-text-primary">
      <IntroLayer isSceneReady={sceneReady} onComplete={() => setIntroComplete(true)} />

      <ErrorBoundary3D>
        <Suspense fallback={null}>
          <SceneCanvas />
        </Suspense>
      </ErrorBoundary3D>

      {introComplete && <FloatingNav />}
      {introComplete && <SectionOverlay />}
    </main>
  )
}
