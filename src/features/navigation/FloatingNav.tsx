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
  const isHome = currentSection === 'hero'

  const handleClick = (id: SectionId) => {
    events.emit('camera:flyTo', id)
  }

  return (
    <nav
      className={`fixed z-50 transition-all duration-500 ${
        isHome
          ? 'right-12 top-1/2 -translate-y-1/2'
          : 'top-6 left-1/2 -translate-x-1/2'
      }`}
      aria-label="Section navigation"
    >
      <ul className={`flex gap-4 ${isHome ? 'flex-col' : 'flex-row items-center'}`}>
        {NAV_ITEMS.map((item, index) => (
          <li
            key={item.id}
            className="animate-nav-slide-in opacity-0"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <button
              onClick={() => handleClick(item.id)}
              className={`group flex items-center gap-2 transition-all duration-300 hover:opacity-100 ${
                isHome ? 'flex-row' : 'flex-col'
              }`}
              style={{ opacity: currentSection === item.id ? 1 : 0.6 }}
            >
              <span
                className={`
                  tracking-wide transition-all duration-300
                  ${isHome ? 'text-sm' : 'text-xs'}
                  ${currentSection === item.id ? 'text-text-primary font-semibold' : 'text-text-secondary font-medium group-hover:text-text-primary'}
                `}
              >
                {item.label}
              </span>
              <span
                className={`
                  rounded-full transition-all duration-300
                  ${
                    currentSection === item.id
                      ? 'w-2 h-2 bg-accent'
                      : 'w-1.5 h-1.5 bg-text-secondary/40 group-hover:bg-text-secondary'
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
