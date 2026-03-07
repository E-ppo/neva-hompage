'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCameraStore } from './useCameraStore'
import { getPositionForProgress, getSectionForProgress } from './cameraPositions'
import { events } from '@/lib/events'
import type { SectionId } from './camera.types'

gsap.registerPlugin(ScrollTrigger)

const LERP_SPEED = 5
const FLY_TO_DURATION = 1.5

const targetPos = new Vector3()
const targetLookAt = new Vector3()
const currentLookAt = new Vector3()

export function CameraController() {
  const { camera } = useThree()
  const scrollContainerRef = useRef<HTMLElement | null>(null)
  const gsapCtxRef = useRef<gsap.Context | null>(null)
  const flyTweenRef = useRef<gsap.core.Tween | null>(null)

  // Set up ScrollTrigger on mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const scrollContainer = document.getElementById('scroll-container')
    scrollContainerRef.current = scrollContainer
    if (!scrollContainer) return

    const ctx = gsap.context(() => {
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
    gsapCtxRef.current = ctx

    // Handle camera:flyTo events
    const handleFlyTo = (section: SectionId) => {
      const store = useCameraStore.getState()
      if (store.isTransitioning) return

      store.flyTo(section)

      // Kill existing fly tween
      flyTweenRef.current?.kill()

      const duration = prefersReducedMotion ? 0 : FLY_TO_DURATION
      const progressTarget = { value: store.scrollProgress }
      const sections = ['hero', 'about', 'projects', 'contact']
      const targetProgress = sections.indexOf(section) / (sections.length - 1)

      flyTweenRef.current = gsap.to(progressTarget, {
        value: targetProgress,
        duration,
        ease: 'power2.inOut',
        onUpdate: () => {
          useCameraStore.getState().setProgress(progressTarget.value)
        },
        onComplete: () => {
          useCameraStore.setState({
            isTransitioning: false,
            currentSection: section,
            scrollProgress: targetProgress,
          })

          // Sync scroll position to match camera
          if (scrollContainer) {
            const scrollMax = scrollContainer.scrollHeight - window.innerHeight
            window.scrollTo({ top: scrollMax * targetProgress })
          }
        },
      })
    }

    events.on('camera:flyTo', handleFlyTo as (section: string) => void)

    return () => {
      ctx.revert()
      flyTweenRef.current?.kill()
      events.off('camera:flyTo', handleFlyTo as (section: string) => void)
    }
  }, [])

  // Interpolate camera position each frame
  useFrame((_, delta) => {
    const { scrollProgress } = useCameraStore.getState()
    const target = getPositionForProgress(scrollProgress)

    targetPos.set(...target.position)
    targetLookAt.set(...target.lookAt)

    camera.position.lerp(targetPos, delta * LERP_SPEED)
    currentLookAt.lerp(targetLookAt, delta * LERP_SPEED)
    camera.lookAt(currentLookAt)
  })

  return null
}
