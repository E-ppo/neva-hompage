'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCameraStore } from './useCameraStore'
import { CAMERA_POSITIONS, getSectionForProgress } from './cameraPositions'
import { SECTION } from './camera.types'
import { events } from '@/lib/events'
import type { SectionId } from './camera.types'

gsap.registerPlugin(ScrollTrigger)

const FLY_TO_DURATION = 1.5

const currentLookAt = new Vector3()

export function CameraController() {
  const { camera, size } = useThree()
  const flyTweenPosRef = useRef<gsap.core.Tween | null>(null)
  const flyTweenLookRef = useRef<gsap.core.Tween | null>(null)
  const posProxy = useRef({ x: 0, y: 0, z: 0 })
  const lookProxy = useRef({ x: 0, y: 0, z: 0 })
  const isFlyingRef = useRef(false)

  // 초기 카메라 위치 (와이드 화면 대응)
  useEffect(() => {
    const aspect = size.width / size.height
    const offsetX = Math.max(0, (aspect - 1.78) * 3)
    camera.position.set(6 + offsetX, 6, 10)
    currentLookAt.set(offsetX, 3, 0)
    camera.lookAt(currentLookAt)

    posProxy.current = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    lookProxy.current = { x: currentLookAt.x, y: currentLookAt.y, z: currentLookAt.z }
  }, [camera, size])

  // ScrollTrigger + flyTo 이벤트
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // 스크롤 컨테이너가 있으면 스크롤 연동
    const scrollContainer = document.getElementById('scroll-container')
    let gsapCtx: gsap.Context | null = null

    if (scrollContainer) {
      gsapCtx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: scrollContainer,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const store = useCameraStore.getState()
            if (store.isTransitioning) return
            store.setProgress(self.progress)

            const section = getSectionForProgress(self.progress)
            if (section !== store.currentSection) {
              useCameraStore.setState({ currentSection: section })
            }
          },
        })
      })
    }

    // flyTo 핸들러 (스크롤 유무와 무관하게 동작)
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

          // 스크롤 컨테이너 있으면 위치 동기화
          if (scrollContainer) {
            const sections: SectionId[] = ['hero', 'about', 'projects', 'contact']
            const targetProgress = sections.indexOf(section) / (sections.length - 1)
            const scrollMax = scrollContainer.scrollHeight - window.innerHeight
            window.scrollTo({ top: scrollMax * targetProgress })
          }
        },
      })
    }

    events.on('camera:flyTo', handleFlyTo as (section: string) => void)

    return () => {
      gsapCtx?.revert()
      flyTweenPosRef.current?.kill()
      flyTweenLookRef.current?.kill()
      events.off('camera:flyTo', handleFlyTo as (section: string) => void)
    }
  }, [])

  // 매 프레임 카메라 업데이트
  useFrame(() => {
    if (isFlyingRef.current) {
      // flyTo 애니메이션 중: GSAP proxy 값 직접 적용
      camera.position.set(posProxy.current.x, posProxy.current.y, posProxy.current.z)
      currentLookAt.set(lookProxy.current.x, lookProxy.current.y, lookProxy.current.z)
      camera.lookAt(currentLookAt)
    }
    // flyTo 끝나면 카메라 그 자리에 유지 (스크롤 연동은 scroll-container 복원 시 활성화)
  })

  return null
}
