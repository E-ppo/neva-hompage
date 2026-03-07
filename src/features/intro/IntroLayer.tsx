'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { INTRO_STATE, type IntroState } from './intro.types'
import { useIntroAnimation } from './useIntroAnimation'
import { useTierStore } from '@/features/tier'
import { TIER } from '@/features/tier'

const LAYER2_DEADLINE_MS = 1500

interface IntroLayerProps {
  isSceneReady?: boolean
}

export function IntroLayer({ isSceneReady = false }: IntroLayerProps) {
  const [deadlineExpired, setDeadlineExpired] = useState(false)
  const [transitionComplete, setTransitionComplete] = useState(false)
  const { containerRef } = useIntroAnimation()
  const currentTier = useTierStore((s) => s.currentTier)
  const isDetecting = useTierStore((s) => s.isDetecting)

  const isMobile = !isDetecting && currentTier === TIER.MOBILE_2D

  // Derive intro state from conditions (no setState in effects)
  const state: IntroState = useMemo(() => {
    if (transitionComplete) return INTRO_STATE.COMPLETE
    if (isMobile) return INTRO_STATE.FALLBACK
    if (isSceneReady) return INTRO_STATE.TRANSITIONING
    if (deadlineExpired) return INTRO_STATE.FALLBACK
    return INTRO_STATE.LAYER1_ACTIVE
  }, [transitionComplete, isMobile, isSceneReady, deadlineExpired])

  // 1.5s deadline timer (only side effect is the timer itself)
  useEffect(() => {
    if (isMobile) return

    const timer = setTimeout(() => {
      setDeadlineExpired(true)
    }, LAYER2_DEADLINE_MS)

    return () => clearTimeout(timer)
  }, [isMobile])

  const handleTransitionEnd = useCallback(() => {
    if (state === INTRO_STATE.TRANSITIONING) {
      setTransitionComplete(true)
    }
  }, [state])

  const isHidden = state === INTRO_STATE.COMPLETE

  return (
    <section
      ref={containerRef}
      className={`fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-bg-deep transition-opacity duration-700 ${
        state === INTRO_STATE.TRANSITIONING ? 'opacity-0' : 'opacity-100'
      } ${isHidden ? 'pointer-events-none hidden' : ''}`}
      onTransitionEnd={handleTransitionEnd}
      aria-label="인트로"
    >
      <h1
        data-intro-animate="name"
        className="font-heading text-text-primary opacity-0"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
      >
        eppo
      </h1>
      <p
        data-intro-animate="title"
        className="mt-4 font-body text-text-secondary opacity-0"
        style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)' }}
      >
        Frontend Developer
      </p>
      <div
        data-intro-animate="keywords"
        className="mt-6 flex flex-wrap justify-center gap-3 opacity-0"
      >
        {['React', 'Three.js', 'React Native', 'TypeScript'].map((keyword) => (
          <span
            key={keyword}
            className="rounded-full px-4 py-1.5 text-sm text-accent"
            style={{ background: 'var(--accent-subtle)' }}
          >
            {keyword}
          </span>
        ))}
      </div>
    </section>
  )
}
