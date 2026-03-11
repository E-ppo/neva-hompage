import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { events } from '@/lib/events'

// Mock R3F Canvas — jsdom doesn't support WebGL
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="r3f-canvas">{children}</div>
  ),
  useThree: () => ({
    camera: {
      position: { lerp: vi.fn(), set: vi.fn() },
      lookAt: vi.fn(),
    },
  }),
  useFrame: vi.fn(),
}))

vi.mock('./StudioScene', () => ({
  StudioScene: () => <div data-testid="studio-scene" />,
}))

vi.mock('@/features/camera/CameraController', () => ({
  CameraController: () => null,
}))

vi.mock('@/lib/events', () => ({
  events: {
    emit: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  },
}))

describe('SceneCanvas', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders R3F Canvas with StudioScene', async () => {
    const { SceneCanvas } = await import('./SceneCanvas')
    const { container } = render(<SceneCanvas />)

    expect(container.querySelector('[data-testid="r3f-canvas"]')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="studio-scene"]')).toBeInTheDocument()
  })

  it('emits scene:loaded on mount', async () => {
    const { SceneCanvas } = await import('./SceneCanvas')
    render(<SceneCanvas />)

    expect(events.emit).toHaveBeenCalledWith('scene:loaded')
  })
})
