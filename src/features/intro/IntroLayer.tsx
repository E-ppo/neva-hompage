'use client'

import { useState, useEffect, useMemo } from 'react'
import { INTRO_STATE, type IntroState } from './intro.types'

const LAYER2_DEADLINE_MS = 1500
const MIN_DISPLAY_MS = 1000
const FADE_OUT_MS = 700

interface IntroLayerProps {
  isSceneReady?: boolean
  onComplete?: () => void
}

export function IntroLayer({ isSceneReady = false, onComplete }: IntroLayerProps) {
  const [deadlineExpired, setDeadlineExpired] = useState(false)
  const [minDisplayPassed, setMinDisplayPassed] = useState(false)
  const [transitionComplete, setTransitionComplete] = useState(false)

  const state: IntroState = useMemo(() => {
    if (transitionComplete) return INTRO_STATE.COMPLETE
    if (isSceneReady && minDisplayPassed) return INTRO_STATE.TRANSITIONING
    if (deadlineExpired && minDisplayPassed) return INTRO_STATE.FALLBACK
    return INTRO_STATE.LAYER1_ACTIVE
  }, [transitionComplete, isSceneReady, minDisplayPassed, deadlineExpired])

  // 최소 표시 시간 + deadline 타이머
  useEffect(() => {
    const minTimer = setTimeout(() => setMinDisplayPassed(true), MIN_DISPLAY_MS)
    const deadlineTimer = setTimeout(() => setDeadlineExpired(true), LAYER2_DEADLINE_MS)

    return () => {
      clearTimeout(minTimer)
      clearTimeout(deadlineTimer)
    }
  }, [])

  // 페이드아웃 시작 시 즉시 Nav 표시, 페이드아웃 완료 후 DOM 제거
  const shouldFadeOut = state === INTRO_STATE.TRANSITIONING || state === INTRO_STATE.FALLBACK
  useEffect(() => {
    if (!shouldFadeOut) return

    // Nav를 바로 띄워서 인트로 페이드아웃과 동시에 슬라이드 인
    onComplete?.()

    const timer = setTimeout(() => {
      setTransitionComplete(true)
    }, FADE_OUT_MS + 50)

    return () => clearTimeout(timer)
  }, [shouldFadeOut, onComplete])

  const isHidden = state === INTRO_STATE.COMPLETE

  return (
    <section
      className={`fixed inset-0 z-[60] flex min-h-screen flex-col items-center justify-center md:pb-0 pb-[20vh] bg-bg-deep transition-opacity duration-700 ${
        shouldFadeOut ? 'opacity-0' : 'opacity-100'
      } ${isHidden ? 'pointer-events-none hidden' : ''}`}
      aria-label="인트로"
    >
      <h1
        className="font-heading text-text-primary animate-intro-fade-up opacity-0"
        style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          letterSpacing: '0.3em',
          lineHeight: 1,
          fontWeight: 600,
        }}
      >
        NEVA
      </h1>
      <div
        className="mt-8 flex items-center gap-4 animate-intro-fade-up opacity-0"
        style={{ animationDelay: '0.6s' }}
      >
        <span className="h-px w-8 bg-text-secondary/40" />
        <p
          className="font-body text-text-secondary italic"
          style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.1rem)', letterSpacing: '0.02em' }}
        >
          From blank canvas to living interface.
        </p>
        <span className="h-px w-8 bg-text-secondary/40" />
      </div>
    </section>
  )
}
