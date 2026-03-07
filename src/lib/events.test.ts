import { describe, it, expect, vi } from 'vitest'
import { events } from './events'

describe('TypedEventEmitter', () => {
  it('emits and receives events with arguments', () => {
    const handler = vi.fn()
    events.on('camera:flyTo', handler)

    events.emit('camera:flyTo', 'about')

    expect(handler).toHaveBeenCalledWith('about')
    events.off('camera:flyTo', handler)
  })

  it('emits events without arguments', () => {
    const handler = vi.fn()
    events.on('scene:loaded', handler)

    events.emit('scene:loaded')

    expect(handler).toHaveBeenCalledTimes(1)
    events.off('scene:loaded', handler)
  })

  it('removes listener with off', () => {
    const handler = vi.fn()
    events.on('camera:reset', handler)
    events.off('camera:reset', handler)

    events.emit('camera:reset')

    expect(handler).not.toHaveBeenCalled()
  })

  it('supports multiple listeners for same event', () => {
    const handler1 = vi.fn()
    const handler2 = vi.fn()
    events.on('scene:loaded', handler1)
    events.on('scene:loaded', handler2)

    events.emit('scene:loaded')

    expect(handler1).toHaveBeenCalledTimes(1)
    expect(handler2).toHaveBeenCalledTimes(1)
    events.off('scene:loaded', handler1)
    events.off('scene:loaded', handler2)
  })

  it('does not throw when emitting with no listeners', () => {
    expect(() => events.emit('camera:reset')).not.toThrow()
  })
})
