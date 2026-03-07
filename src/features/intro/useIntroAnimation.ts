'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useIntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const ctx = gsap.context(() => {
      const elements = containerRef.current!.querySelectorAll('[data-intro-animate]')

      if (prefersReducedMotion) {
        gsap.set(elements, { opacity: 1, y: 0 })
        return
      }

      const tl = gsap.timeline()
      timelineRef.current = tl

      tl.to('[data-intro-animate="name"]', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
        .to(
          '[data-intro-animate="title"]',
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.2',
        )
        .to(
          '[data-intro-animate="keywords"]',
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.1',
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return { containerRef }
}
