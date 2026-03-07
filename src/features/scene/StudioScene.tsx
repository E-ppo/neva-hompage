'use client'

import { Lighting } from './Lighting'
import type { SceneProps } from './scene.types'

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#1a1412" />
    </mesh>
  )
}

function Walls() {
  return (
    <>
      {/* Back wall */}
      <mesh position={[0, 5, -10]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#241e19" />
      </mesh>

      {/* Left wall */}
      <mesh position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#241e19" />
      </mesh>

      {/* Right wall — window wall (transparent/emissive for sunset) */}
      <mesh position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial
          color="#e8933b"
          emissive="#f5c472"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </>
  )
}

function Ceiling() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#1a1412" />
    </mesh>
  )
}

function Desk() {
  return (
    <group position={[-4, 0, 0]}>
      {/* Desktop surface */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[2.4, 0.08, 1.2]} />
        <meshStandardMaterial color="#3d2e22" />
      </mesh>
      {/* Legs */}
      {[[-1.1, 0.375, -0.5], [1.1, 0.375, -0.5], [-1.1, 0.375, 0.5], [1.1, 0.375, 0.5]].map(
        (pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} castShadow>
            <boxGeometry args={[0.06, 0.75, 0.06]} />
            <meshStandardMaterial color="#2a1f17" />
          </mesh>
        ),
      )}
    </group>
  )
}

function Chair() {
  return (
    <group position={[-4, 0, 1.5]}>
      {/* Seat */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.5, 0.06, 0.5]} />
        <meshStandardMaterial color="#3d2e22" />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.8, -0.22]} castShadow>
        <boxGeometry args={[0.5, 0.65, 0.06]} />
        <meshStandardMaterial color="#3d2e22" />
      </mesh>
      {/* Legs */}
      {[[-0.2, 0.225, -0.2], [0.2, 0.225, -0.2], [-0.2, 0.225, 0.2], [0.2, 0.225, 0.2]].map(
        (pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.45]} />
            <meshStandardMaterial color="#2a1f17" />
          </mesh>
        ),
      )}
    </group>
  )
}

function BulletinBoard() {
  return (
    <group position={[4, 2, -9.9]}>
      {/* Board frame */}
      <mesh castShadow>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial color="#5a3e2b" />
      </mesh>
      {/* Board surface */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[2.8, 1.8, 0.02]} />
        <meshStandardMaterial color="#8b6f47" />
      </mesh>
    </group>
  )
}

function Bookshelf({ visible }: { visible: boolean }) {
  if (!visible) return null
  return (
    <group position={[-9.9, 1.5, -5]}>
      {/* Shelf frame */}
      <mesh rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[1.5, 3, 0.4]} />
        <meshStandardMaterial color="#3d2e22" />
      </mesh>
      {/* Books (colored boxes) */}
      {[
        { pos: [0.05, 0.8, -0.3] as [number, number, number], color: '#e8933b', size: [0.25, 0.6, 0.15] as [number, number, number] },
        { pos: [0.05, 0.8, 0] as [number, number, number], color: '#b8a99a', size: [0.25, 0.5, 0.12] as [number, number, number] },
        { pos: [0.05, 0.8, 0.25] as [number, number, number], color: '#f0ebe3', size: [0.25, 0.55, 0.13] as [number, number, number] },
      ].map((book, i) => (
        <mesh key={i} position={book.pos} rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={book.size} />
          <meshStandardMaterial color={book.color} />
        </mesh>
      ))}
    </group>
  )
}

function CoffeeMug() {
  return (
    <group position={[-3.2, 0.79, 0.3]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.04, 0.035, 0.1, 16]} />
        <meshStandardMaterial color="#f0ebe3" />
      </mesh>
    </group>
  )
}

export function StudioScene({ tier = 'full' }: SceneProps) {
  const isLite = tier === 'lite'

  return (
    <>
      <Lighting />
      <Floor />
      <Walls />
      <Ceiling />
      <Desk />
      <Chair />
      <BulletinBoard />
      <Bookshelf visible={!isLite} />
      <CoffeeMug />
    </>
  )
}
