'use client'

import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Box3, Vector3, Object3D, Mesh } from 'three'
import { useCameraStore } from '@/features/camera'

export function MenuBoardTracker({ scene }: { scene: Object3D }) {
  const { camera, size, invalidate } = useThree()
  const meshRef = useRef<Mesh | null>(null)

  useEffect(() => {
    scene.traverse((child) => {
      if (child.name === 'SM_menu_board002') {
        meshRef.current = child as Mesh
      }
    })
  }, [scene])

  const emitBounds = () => {
    const mesh = meshRef.current
    if (!mesh) return

    mesh.updateWorldMatrix(true, false)
    const box = new Box3().setFromObject(mesh)

    const corners = [
      new Vector3(box.min.x, box.min.y, box.min.z),
      new Vector3(box.max.x, box.min.y, box.min.z),
      new Vector3(box.min.x, box.max.y, box.min.z),
      new Vector3(box.max.x, box.max.y, box.min.z),
      new Vector3(box.min.x, box.min.y, box.max.z),
      new Vector3(box.max.x, box.min.y, box.max.z),
      new Vector3(box.min.x, box.max.y, box.max.z),
      new Vector3(box.max.x, box.max.y, box.max.z),
    ]

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    for (const corner of corners) {
      corner.project(camera)
      const sx = (corner.x * 0.5 + 0.5) * size.width
      const sy = (corner.y * -0.5 + 0.5) * size.height
      minX = Math.min(minX, sx)
      maxX = Math.max(maxX, sx)
      minY = Math.min(minY, sy)
      maxY = Math.max(maxY, sy)
    }

    // 프레임 안쪽으로 축소 (3D Plane과 동일 비율)
    const fullW = maxX - minX
    const fullH = maxY - minY
    const insetX = fullW * (1 - 0.88) / 2
    const insetY = fullH * (1 - 0.85) / 2

    window.dispatchEvent(new CustomEvent('mesh:screen-bounds', {
      detail: {
        left: Math.round(minX + insetX),
        top: Math.round(minY + insetY),
        width: Math.round(fullW * 0.88),
        height: Math.round(fullH * 0.85),
      },
    }))
  }

  const currentSection = useCameraStore((s) => s.currentSection)
  const isTransitioning = useCameraStore((s) => s.isTransitioning)

  useEffect(() => {
    if (currentSection === 'projects' && !isTransitioning) {
      requestAnimationFrame(() => {
        invalidate()
        requestAnimationFrame(() => emitBounds())
      })
    }
  }, [currentSection, isTransitioning])

  useEffect(() => {
    if (currentSection === 'projects' && !isTransitioning) {
      emitBounds()
    }
  }, [size])

  return null
}
