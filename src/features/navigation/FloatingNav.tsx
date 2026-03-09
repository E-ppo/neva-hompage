'use client'

import { useState } from 'react'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export function FloatingNav() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <nav
      className="fixed right-8 top-1/2 z-50 -translate-y-1/2"
      aria-label="Section navigation"
    >
      <ul className="flex flex-col gap-3">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActive(item.id)}
              className={`
                group flex items-center gap-3 px-4 py-2.5 rounded-full
                backdrop-blur-md border transition-all duration-300
                ${
                  active === item.id
                    ? 'bg-accent/20 border-accent/40 text-text-primary'
                    : 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-text-secondary hover:text-text-primary hover:border-accent/30'
                }
              `}
            >
              <span
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${active === item.id ? 'bg-accent scale-125' : 'bg-text-secondary/50 group-hover:bg-accent/60'}
                `}
              />
              <span className="text-sm font-heading tracking-wide">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
