'use client'

import { useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'
import { StudioScene } from './StudioScene'
import { GradientBackground } from './GradientBackground'
import { CameraController } from '@/features/camera/CameraController'
import { events } from '@/lib/events'

export function SceneCanvas() {
  useEffect(() => {
    events.emit('scene:loaded')
  }, [])

  const handleCreated = useCallback((state: RootState) => {
    const canvas = state.gl.domElement
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault()
    })
    canvas.addEventListener('webglcontextrestored', () => {
      state.invalidate()
    })
  }, [])

  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{ antialias: true, alpha: false, powerPreference: 'default' }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [6, 6, 10] }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      role="img"
      aria-label="NEVA 3D 포트폴리오 공간"
      onCreated={handleCreated}
    >
      <color attach="background" args={['#e8ddd0']} />
      <fog attach="fog" args={['#d8dfe4', 15, 40]} />
      <GradientBackground topColor="#e8f0f8" bottomColor="#e8ddd0" />
      <CameraController />
      <StudioScene tier="full" />
    </Canvas>
  )
}
