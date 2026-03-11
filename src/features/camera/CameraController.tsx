'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import gsap from 'gsap'
import { useCameraStore } from './useCameraStore'
import { CAMERA_POSITIONS, SECTION_ORDER } from './cameraPositions'
import { events } from '@/lib/events'
import type { SectionId } from './camera.types'

const FLY_TO_DURATION = 1.5

export function CameraController() {
  const { camera, size } = useThree()
  const flyTweenPosRef = useRef<gsap.core.Tween | null>(null)
  const flyTweenLookRef = useRef<gsap.core.Tween | null>(null)
  const posProxy = useRef({ x: 0, y: 0, z: 0 })
  const lookProxy = useRef({ x: 0, y: 0, z: 0 })
  const isFlyingRef = useRef(false)
  const currentLookAtRef = useRef(new Vector3())

  // 초기 카메라 위치 (와이드 화면 대응)
  useEffect(() => {
    const aspect = size.width / size.height
    const offsetX = Math.max(0, (aspect - 1.78) * 3)
    camera.position.set(6 + offsetX, 6, 10)
    currentLookAtRef.current.set(offsetX, 3, 0)
    camera.lookAt(currentLookAtRef.current)

    posProxy.current = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    lookProxy.current = { x: currentLookAtRef.current.x, y: currentLookAtRef.current.y, z: currentLookAtRef.current.z }
  }, [camera, size])

  // flyTo + 휠 스크롤 이벤트
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const handleFlyTo = (section: SectionId) => {
      const store = useCameraStore.getState()
      if (store.isTransitioning) return

      const target = CAMERA_POSITIONS[section]
      if (!target) return

      store.flyTo(section)
      flyTweenPosRef.current?.kill()
      flyTweenLookRef.current?.kill()
      isFlyingRef.current = true

      const duration = prefersReducedMotion ? 0 : FLY_TO_DURATION

      flyTweenPosRef.current = gsap.to(posProxy.current, {
        x: target.position[0],
        y: target.position[1],
        z: target.position[2],
        duration,
        ease: 'power2.inOut',
      })

      flyTweenLookRef.current = gsap.to(lookProxy.current, {
        x: target.lookAt[0],
        y: target.lookAt[1],
        z: target.lookAt[2],
        duration,
        ease: 'power2.inOut',
        onComplete: () => {
          isFlyingRef.current = false
          useCameraStore.setState({
            isTransitioning: false,
            currentSection: section,
          })
        },
      })
    }

    // 휠 스크롤로 섹션 순서 이동 (Canvas 위에서만 동작)
    const canvas = document.querySelector('canvas')
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const store = useCameraStore.getState()
      if (store.isTransitioning) return

      const currentIndex = SECTION_ORDER.indexOf(store.currentSection)
      if (currentIndex === -1) return

      const nextIndex = e.deltaY > 0
        ? Math.min(currentIndex + 1, SECTION_ORDER.length - 1)
        : Math.max(currentIndex - 1, 0)

      if (nextIndex === currentIndex) return

      handleFlyTo(SECTION_ORDER[nextIndex])
    }

    canvas?.addEventListener('wheel', handleWheel, { passive: false })
    events.on('camera:flyTo', handleFlyTo )

    return () => {
      canvas?.removeEventListener('wheel', handleWheel)
      flyTweenPosRef.current?.kill()
      flyTweenLookRef.current?.kill()
      events.off('camera:flyTo', handleFlyTo )
    }
  }, [])

  // 매 프레임 카메라 업데이트
  useFrame(() => {
    if (isFlyingRef.current) {
      camera.position.set(posProxy.current.x, posProxy.current.y, posProxy.current.z)
      currentLookAtRef.current.set(lookProxy.current.x, lookProxy.current.y, lookProxy.current.z)
      camera.lookAt(currentLookAtRef.current)
    }
  })

  return null
}
