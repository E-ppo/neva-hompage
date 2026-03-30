'use client'

import { useState, useEffect } from 'react'
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const isHome = currentSection === 'hero' && !isMobile

  const handleClick = (id: SectionId) => {
    events.emit('camera:flyTo', id)
  }

  return (
    <>
      {/* 사이드 네비 (hero + 데스크톱만) */}
      <nav
        className={`fixed z-50 right-4 md:right-12 top-1/2 -translate-y-1/2 transition-opacity duration-500 hidden md:block ${
          isHome ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Section navigation"
      >
        <ul className="flex flex-col gap-4">
          {NAV_ITEMS.map((item, index) => (
            <li
              key={item.id}
              className="animate-nav-slide-in opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => handleClick(item.id)}
                className="group flex items-center flex-row gap-2 transition-all duration-300 hover:opacity-100"
                style={{ opacity: currentSection === item.id ? 1 : 0.8 }}
              >
                <span
                  className={`
                    tracking-wide transition-all duration-300 text-base md:text-lg
                    ${currentSection === item.id ? 'text-text-primary font-semibold' : 'text-text-secondary font-medium group-hover:text-text-primary'}
                  `}
                  style={{
                    textShadow: currentSection === item.id
                      ? '0 0 16px rgba(232,147,59,0.6)'
                      : '0 0 16px rgba(240,235,227,0.5)',
                  }}
                >
                  {item.label}
                </span>
                <span
                  className={`
                    rounded-full transition-all duration-300
                    ${
                      currentSection === item.id
                        ? 'w-2.5 h-2.5 bg-accent'
                        : 'w-1.5 h-1.5 bg-text-secondary/40 group-hover:bg-text-secondary'
                    }
                  `}
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 상단 네비 (hero 이외 or 모바일) */}
      {!isHome && (
        <nav
          className="fixed z-50 top-3 left-1/2 -translate-x-1/2"
          aria-label="Section navigation"
        >
          <ul className="flex flex-row items-center rounded-full bg-black/50 backdrop-blur-sm px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 gap-2.5 sm:gap-3 lg:gap-4">
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.id}
                className="animate-nav-slide-down opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => handleClick(item.id)}
                  className="group flex items-center gap-2 transition-all duration-300 hover:opacity-100"
                  style={{ opacity: currentSection === item.id ? 1 : 0.8 }}
                >
                  <span
                    className={`
                      tracking-wide transition-all duration-300 text-xs sm:text-sm
                      ${currentSection === item.id ? 'text-text-primary font-semibold' : 'text-text-secondary font-medium group-hover:text-text-primary'}
                      ${currentSection === item.id ? 'border-b-2 border-accent pb-0.5' : 'border-b-2 border-transparent pb-0.5'}
                    `}
                    style={{
                      textShadow: currentSection === item.id
                        ? '0 0 16px rgba(232,147,59,0.6)'
                        : '0 0 16px rgba(240,235,227,0.5)',
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  )
}
