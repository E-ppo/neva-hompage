'use client'

import { useEffect, useCallback, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import {
  Mesh,
  MeshStandardMaterial,
  DoubleSide,
  Object3D,
  Vector3,
  Box3,
} from 'three'
import { Lighting } from './Lighting'
import { RingPulse } from './RingPulse'
import { MenuBoardTracker } from './MenuBoardTracker'
import { useCameraStore } from '@/features/camera'
import type { SectionId } from '@/features/camera'
import { events } from '@/lib/events'
import type { SceneProps } from './scene.types'
import type { ThreeEvent } from '@react-three/fiber'

const MODEL_PATH = '/models/coffee-shop/coffee-shop-draco.glb'
// 인터랙티브 오브젝트 매핑 (메시이름 → 섹션)
const INTERACTIVE_OBJECTS: Record<string, SectionId> = {
  SM_menu_board002: 'projects',
  SM_laptop: 'blog',
  SM_cell_phone: 'contact',
}

// bunny 메시는 이름이 여러 개라 prefix로 매칭
function isInteractive(name: string): SectionId | null {
  if (name in INTERACTIVE_OBJECTS) return INTERACTIVE_OBJECTS[name]
  if (name.startsWith('bunny')) return 'about'
  return null
}

/** 머티리얼을 Opaque + DoubleSide로 보정 */
function fixMaterials(root: Object3D) {
  root.traverse((child) => {
    if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
      child.material.transparent = false
      child.material.opacity = 1
      child.material.depthWrite = true
      child.material.side = DoubleSide
      child.material.needsUpdate = true
    }
  })
}

// 링 펄스 위치 정보
interface RingPosition {
  section: string
  position: [number, number, number]
}

/** 인터랙티브 오브젝트의 바닥 중심 월드 좌표 수집 (섹션별 1개) */
function collectRingPositions(root: Object3D): RingPosition[] {
  const sectionBounds: Record<string, Box3> = {}

  root.traverse((child) => {
    if (child instanceof Mesh) {
      const section = isInteractive(child.name)
      if (!section) return
      child.updateWorldMatrix(true, false)
      const box = new Box3().setFromObject(child)
      if (sectionBounds[section]) {
        sectionBounds[section].union(box)
      } else {
        sectionBounds[section] = box
      }
    }
  })

  return Object.entries(sectionBounds).map(([section, box]) => {
    const center = new Vector3()
    box.getCenter(center)
    return {
      section,
      position: [center.x, box.min.y + 0.05, center.z] as [number, number, number],
    }
  })
}

function CoffeeShop() {
  const { scene } = useGLTF(MODEL_PATH)

  useEffect(() => {
    fixMaterials(scene)
  }, [scene])

  const currentSection = useCameraStore((s) => s.currentSection)

  const ringPositions = useMemo(() => {
    return collectRingPositions(scene)
  }, [scene])

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    const section = isInteractive(e.object.name)
    if (section) {
      e.stopPropagation()
      events.emit('camera:flyTo', section)
    }
  }, [])

  const handlePointerOver = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (isInteractive(e.object.name)) {
      e.stopPropagation()
      document.body.style.cursor = 'pointer'
    }
  }, [])

  const handlePointerOut = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (isInteractive(e.object.name)) {
      document.body.style.cursor = 'auto'
    }
  }, [])

  useEffect(() => {
    return () => { document.body.style.cursor = 'auto' }
  }, [])

  return (
    <group scale={1.5} position={[-3.5, 0, 0]}>
      <primitive
        object={scene}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
      {currentSection === 'hero' && ringPositions.map((rp) => (
        <RingPulse key={rp.section} position={rp.position} />
      ))}
      <MenuBoardTracker scene={scene} />
    </group>
  )
}

export function StudioScene(_props: SceneProps) {
  return (
    <>
      <Lighting />
      <CoffeeShop />
    </>
  )
}

useGLTF.preload(MODEL_PATH)
