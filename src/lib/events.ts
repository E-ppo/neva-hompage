type EventMap = {
  'camera:flyTo': [section: string]
  'camera:reset': []
  'scene:loaded': []
}

type EventName = keyof EventMap

type EventHandler<T extends EventName> = (...args: EventMap[T]) => void

class TypedEventEmitter {
  private listeners = new Map<string, Set<(...args: unknown[]) => void>>()

  on<T extends EventName>(event: T, handler: EventHandler<T>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(handler as (...args: unknown[]) => void)
  }

  off<T extends EventName>(event: T, handler: EventHandler<T>) {
    this.listeners.get(event)?.delete(handler as (...args: unknown[]) => void)
  }

  emit<T extends EventName>(event: T, ...args: EventMap[T]) {
    this.listeners.get(event)?.forEach((handler) => handler(...args))
  }
}

export const events = new TypedEventEmitter()
export type { EventMap, EventName }
