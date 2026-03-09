'use client'

import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { StudioScene } from './StudioScene'
import { GradientBackground } from './GradientBackground'
import { CameraController } from '@/features/camera/CameraController'
import { useTierStore } from '@/features/tier'
import { TIER } from '@/features/tier'
import { events } from '@/lib/events'

export function SceneCanvas() {
  const currentTier = useTierStore((s) => s.currentTier)

  const tier = currentTier === TIER.TABLET_3D_LITE ? 'lite' : 'full'

  useEffect(() => {
    events.emit('scene:loaded')
  }, [])

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [6, 6, 10] }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      role="img"
      aria-label="eppo의 작업실 3D 포트폴리오 공간"
    >
      <color attach="background" args={['#e8ddd0']} />
      <fog attach="fog" args={['#d8dfe4', 15, 40]} />
      <GradientBackground topColor="#e8f0f8" bottomColor="#e8ddd0" />
      <CameraController />
      <StudioScene tier={tier} />
    </Canvas>
  )
}
