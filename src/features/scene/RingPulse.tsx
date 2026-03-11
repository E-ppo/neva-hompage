'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshBasicMaterial, Mesh } from 'three'

interface RingPulseProps {
  position: [number, number, number]
  color?: string
  maxScale?: number
  speed?: number
}

export function RingPulse({
  position,
  color = '#4dd9e8',
  maxScale = 2.5,
  speed = 1.2,
}: RingPulseProps) {
  const ring1 = useRef<Mesh>(null)
  const ring2 = useRef<Mesh>(null)
  const invalidate = useThree((s) => s.invalidate)

  useFrame(({ clock }) => {
    invalidate()
    const t = clock.getElapsedTime() * speed

    // 두 개의 링이 시차를 두고 펄스
    for (const [ref, offset] of [
      [ring1, 0],
      [ring2, Math.PI],
    ] as const) {
      const mesh = ref.current
      if (!mesh) continue
      const phase = ((t + offset) % (Math.PI * 2)) / (Math.PI * 2)
      const scale = 1 + phase * (maxScale - 1)
      mesh.scale.set(scale, scale, 1)
      ;(mesh.material as MeshBasicMaterial).opacity = 0.6 * (1 - phase)
    }
  })

  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={ring1}>
        <ringGeometry args={[0.3, 0.45, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} depthWrite={false} />
      </mesh>
      <mesh ref={ring2}>
        <ringGeometry args={[0.3, 0.45, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} depthWrite={false} />
      </mesh>
    </group>
  )
}
