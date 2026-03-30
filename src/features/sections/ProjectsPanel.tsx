'use client'

import { useState } from 'react'

const PROJECTS = [
  {
    title: 'Blocky',
    image: '/images/projects/blocky/blocky-thumbnail.png',
  },
  {
    title: 'Project 2',
    image: '/images/projects/placeholder-2.png',
  },
]

interface ProjectsPanelProps {
  style?: React.CSSProperties
  className?: string
}

export function ProjectsPanel({ style, className }: ProjectsPanelProps) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + PROJECTS.length) % PROJECTS.length)
  const next = () => setCurrent((c) => (c + 1) % PROJECTS.length)

  const project = PROJECTS[current]

  return (
    <div className={className} style={style}>
      {/* 이미지 */}
      <div className="relative w-full h-full overflow-hidden rounded-sm">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-contain"
          draggable={false}
        />
        {/* 가장자리 비네팅 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 6px 3px rgba(0,0,0,0.3)',
          }}
        />
      </div>

      {/* 좌측 화살표 */}
      <button
        onClick={prev}
        className="absolute -left-14 sm:-left-20 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 flex items-center justify-center text-lg sm:text-xl transition-all"
      >
        ‹
      </button>

      {/* 우측 화살표 */}
      <button
        onClick={next}
        className="absolute -right-14 sm:-right-20 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 flex items-center justify-center text-lg sm:text-xl transition-all"
      >
        ›
      </button>

      {/* 하단 인디케이터 */}
      <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {PROJECTS.map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === current ? 'bg-accent' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
