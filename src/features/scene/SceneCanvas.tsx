'use client'

import { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { StudioScene } from './StudioScene'
import { useTierStore } from '@/features/tier'
import { TIER } from '@/features/tier'
import { events } from '@/lib/events'

function CameraSetup() {
  const { camera, size } = useThree()
  useEffect(() => {
    const aspect = size.width / size.height
    // 기준 비율 16:9(1.78) 이상일 때 카메라를 오른쪽으로 밀어 모델이 좌측에 붙게
    const offsetX = Math.max(0, (aspect - 1.78) * 3)
    camera.position.set(6 + offsetX, 6, 10)
    camera.lookAt(offsetX, 3, 0)
  }, [camera, size])
  return null
}

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
      <color attach="background" args={['#f5e6d3']} />
      <CameraSetup />
      <StudioScene tier={tier} />
      {/* <OrbitControls target={[0, 3, 0]} /> */}
    </Canvas>
  )
}
