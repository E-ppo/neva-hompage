'use client'

import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { StudioScene } from './StudioScene'
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
      <color attach="background" args={['#2a2520']} />
      <StudioScene tier={tier} />
      {/* <OrbitControls target={[0, 3, 0]} /> */}
    </Canvas>
  )
}
