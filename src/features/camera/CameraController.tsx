'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import gsap from 'gsap'
import { useCameraStore } from './useCameraStore'
import { CAMERA_POSITIONS, CAMERA_POSITIONS_MOBILE, SECTION_ORDER } from './cameraPositions'
import { events } from '@/lib/events'
import type { SectionId } from './camera.types'

const FLY_TO_DURATION = 1.5

const MOBILE_BREAKPOINT = 768

export function CameraController() {
  const { camera, size, invalidate } = useThree()
  const sizeRef = useRef(size)
  useEffect(() => { sizeRef.current = size }, [size])
  const flyTweenPosRef = useRef<gsap.core.Tween | null>(null)
  const flyTweenLookRef = useRef<gsap.core.Tween | null>(null)
  const posProxy = useRef({ x: 0, y: 0, z: 0 })
  const lookProxy = useRef({ x: 0, y: 0, z: 0 })
  const isFlyingRef = useRef(false)
  const currentLookAtRef = useRef(new Vector3())
  const invalidateRef = useRef(invalidate)
  useEffect(() => { invalidateRef.current = invalidate }, [invalidate])

  // 초기 카메라 위치 — Hero 섹션에서만 리셋
  useEffect(() => {
    const { currentSection, isTransitioning } = useCameraStore.getState()
    if (currentSection !== 'hero' || isTransitioning) return

    const isMobile = size.width < MOBILE_BREAKPOINT

    if (isMobile) {
      const hero = CAMERA_POSITIONS_MOBILE.hero
      camera.position.set(...hero.position)
      currentLookAtRef.current.set(...hero.lookAt)
    } else {
      const aspect = size.width / size.height
      const offsetX = Math.max(0, (aspect - 1.78) * 3)
      camera.position.set(6 + offsetX, 6, 10)
      currentLookAtRef.current.set(offsetX, 3, 0)
    }

    camera.lookAt(currentLookAtRef.current)
    posProxy.current = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    lookProxy.current = {
      x: currentLookAtRef.current.x,
      y: currentLookAtRef.current.y,
      z: currentLookAtRef.current.z,
    }
    invalidate()
  }, [camera, size, invalidate])

  // flyTo + 휠 스크롤 이벤트
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const handleFlyTo = (section: SectionId) => {
      const store = useCameraStore.getState()
      if (store.isTransitioning) return

      const positions = sizeRef.current.width < MOBILE_BREAKPOINT ? CAMERA_POSITIONS_MOBILE : CAMERA_POSITIONS
      const target = positions[section]
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
        ease: 'sine.inOut',
        onUpdate: () => invalidateRef.current(),
      })

      flyTweenLookRef.current = gsap.to(lookProxy.current, {
        x: target.lookAt[0],
        y: target.lookAt[1],
        z: target.lookAt[2],
        duration,
        ease: 'sine.inOut',
        onComplete: () => {
          isFlyingRef.current = false
          useCameraStore.setState({
            isTransitioning: false,
            currentSection: section,
          })
          invalidateRef.current()
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

      const nextIndex =
        e.deltaY > 0
          ? (currentIndex + 1) % SECTION_ORDER.length
          : (currentIndex - 1 + SECTION_ORDER.length) % SECTION_ORDER.length

      handleFlyTo(SECTION_ORDER[nextIndex])
    }

    // 터치 스와이프로 섹션 이동
    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(deltaY) < 50) return // 50px 미만은 무시

      const store = useCameraStore.getState()
      if (store.isTransitioning) return

      const currentIndex = SECTION_ORDER.indexOf(store.currentSection)
      if (currentIndex === -1) return

      const nextIndex =
        deltaY > 0
          ? (currentIndex + 1) % SECTION_ORDER.length
          : (currentIndex - 1 + SECTION_ORDER.length) % SECTION_ORDER.length

      handleFlyTo(SECTION_ORDER[nextIndex])
    }

    canvas?.addEventListener('wheel', handleWheel, { passive: false })
    canvas?.addEventListener('touchstart', handleTouchStart, { passive: true })
    canvas?.addEventListener('touchend', handleTouchEnd, { passive: true })
    events.on('camera:flyTo', handleFlyTo)

    return () => {
      canvas?.removeEventListener('wheel', handleWheel)
      canvas?.removeEventListener('touchstart', handleTouchStart)
      canvas?.removeEventListener('touchend', handleTouchEnd)
      flyTweenPosRef.current?.kill()
      flyTweenLookRef.current?.kill()
      events.off('camera:flyTo', handleFlyTo)
    }
  }, [])

  // 매 프레임 카메라 업데이트
  useFrame(() => {
    if (isFlyingRef.current) {
      camera.position.set(posProxy.current.x, posProxy.current.y, posProxy.current.z)
      currentLookAtRef.current.set(lookProxy.current.x, lookProxy.current.y, lookProxy.current.z)
      camera.lookAt(currentLookAtRef.current)
      invalidate()
    }
  })

  return null
}
