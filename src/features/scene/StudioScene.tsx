'use client'

import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { Mesh, MeshStandardMaterial, DoubleSide, Object3D } from 'three'
import { Lighting } from './Lighting'
import type { SceneProps } from './scene.types'

const MODEL_PATH = '/models/coffee-shop/coffee-shop.glb'

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

function CoffeeShop() {
  const { scene } = useGLTF(MODEL_PATH)

  useEffect(() => {
    fixMaterials(scene)
  }, [scene])

  return <primitive object={scene} scale={1.5} position={[-3.5, 0, 0]} />
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
