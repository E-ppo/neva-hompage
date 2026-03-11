'use client'

import { events } from '@/lib/events'
import { useCameraStore } from '@/features/camera'
import type { SectionId } from '@/features/camera'

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

export function FloatingNav() {
  const currentSection = useCameraStore((s) => s.currentSection)

  const handleClick = (id: SectionId) => {
    events.emit('camera:flyTo', id)
  }

  return (
    <nav
      className="fixed right-12 top-1/2 z-50 -translate-y-1/2"
      aria-label="Section navigation"
    >
      <ul className="flex flex-col gap-4">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className="group flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-100"
              style={{ opacity: currentSection === item.id ? 1 : 0.6 }}
            >
              <span
                className={`
                  text-sm tracking-wide transition-all duration-300
                  ${currentSection === item.id ? 'text-gray-900 font-semibold' : 'text-gray-600 font-medium group-hover:text-gray-800'}
                `}
              >
                {item.label}
              </span>
              <span
                className={`
                  rounded-full transition-all duration-300
                  ${
                    currentSection === item.id
                      ? 'w-2.5 h-2.5 bg-gray-800'
                      : 'w-1.5 h-1.5 bg-gray-400 group-hover:bg-gray-600'
                  }
                `}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
