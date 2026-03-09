'use client'

import { useEffect, useCallback } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import {
  Mesh,
  MeshStandardMaterial,
  DoubleSide,
  Object3D,
  Color,
} from 'three'
import { Lighting } from './Lighting'
import type { SceneProps } from './scene.types'
import type { ThreeEvent } from '@react-three/fiber'

const MODEL_PATH = '/models/coffee-shop/coffee-shop.glb'
// 인터랙티브 오브젝트 매핑 (메시이름 → 섹션)
const INTERACTIVE_OBJECTS: Record<string, string> = {
  SM_menu_board002: 'projects',
  SM_cell_phone: 'contact',
}

// bunny 메시는 이름이 여러 개라 prefix로 매칭
function isInteractive(name: string): string | null {
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

/** 액자(menu_board) 메시에 emissive 설정 */
function setupFrameGlow(root: Object3D, meshes: Mesh[]) {
  root.traverse((child) => {
    if (
      child instanceof Mesh &&
      child.material instanceof MeshStandardMaterial &&
      isInteractive(child.name) !== null
    ) {
      const cloned = child.material.clone()
      cloned.emissive = new Color('#e8933b')
      cloned.emissiveIntensity = 0.3
      cloned.needsUpdate = true
      child.material = cloned
      meshes.push(child)
    }
  })
}

// module-level to avoid react-hooks/immutability lint rule
let frameMeshesCache: Mesh[] = []
let isHovered = false

function CoffeeShop() {
  const { scene } = useGLTF(MODEL_PATH)

  useEffect(() => {
    // 이전 클론 머티리얼 정리 (HMR/strict mode 대응)
    for (const mesh of frameMeshesCache) {
      if (mesh.material instanceof MeshStandardMaterial) {
        mesh.material.dispose()
      }
    }
    fixMaterials(scene)
    frameMeshesCache = []
    setupFrameGlow(scene, frameMeshesCache)
    return () => {
      for (const mesh of frameMeshesCache) {
        if (mesh.material instanceof MeshStandardMaterial) {
          mesh.material.dispose()
        }
      }
    }
  }, [scene])

  // 글로우 펄스 + bunny 머리 흔들기 애니메이션
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // 글로우 펄스
    const intensity = 0.3 + Math.sin(t * 2) * 0.2
    for (const mesh of frameMeshesCache) {
      if (mesh.material instanceof MeshStandardMaterial) {
        mesh.material.emissiveIntensity = isHovered ? intensity + 0.3 : intensity
      }
    }

  })

  const isFrameMesh = (name: string) => isInteractive(name) !== null

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    const section = isInteractive(e.object.name)
    if (section) {
      e.stopPropagation()
      console.log('[DEBUG] clicked section:', section, e.object.name)
      // TODO: 카메라 flyTo 구현 시 여기서 섹션별 이동
    }
  }, [])

  const handlePointerOver = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (isFrameMesh(e.object.name)) {
      e.stopPropagation()
      isHovered = true
      document.body.style.cursor = 'pointer'
    }
  }, [])

  const handlePointerOut = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (isFrameMesh(e.object.name)) {
      isHovered = false
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <primitive
      object={scene}
      scale={1.5}
      position={[-3.5, 0, 0]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
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
