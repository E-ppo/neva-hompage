export const INTRO_STATE = {
  LAYER1_ACTIVE: 'layer1-active',
  TRANSITIONING: 'transitioning',
  COMPLETE: 'complete',
  FALLBACK: 'fallback',
} as const

export type IntroState = (typeof INTRO_STATE)[keyof typeof INTRO_STATE]
