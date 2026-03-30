'use client'

import { useState } from 'react'

const PROJECTS = [
  {
    title: 'Blocky',
    description: '흩어진 할 일, 시간 위에 놓는 순간 실행이 된다.',
    image: '/images/projects/blocky/blocky-thumbnail.png',
  },
  {
    title: 'Project 2',
    description: '준비 중입니다.',
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
        className="absolute -left-14 sm:-left-20 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 flex items-center justify-center text-lg sm:text-xl leading-none transition-all"
      >
        <span className="-mt-0.5">‹</span>
      </button>

      {/* 우측 화살표 */}
      <button
        onClick={next}
        className="absolute -right-14 sm:-right-20 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 flex items-center justify-center text-lg sm:text-xl leading-none transition-all"
      >
        <span className="-mt-0.5">›</span>
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

      {/* 캡션 */}
      <div
        className="absolute -bottom-24 sm:-bottom-32 left-1/2 -translate-x-1/2 w-[110%] rounded-xl px-4 py-3 sm:px-5 sm:py-4 backdrop-blur-sm"
        style={{
          background: 'rgba(15, 13, 11, 0.75)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <p className="font-body text-text-secondary text-[10px] sm:text-xs leading-relaxed break-keep">
          {project.description}
        </p>
        <div className="flex items-center justify-between mt-1.5 sm:mt-2">
          <span className="font-heading text-text-primary text-sm sm:text-base font-semibold tracking-wide">
            {project.title}
          </span>
          <button className="text-accent text-[10px] sm:text-xs hover:text-accent-glow transition-colors">
            자세히 보기 →
          </button>
        </div>
      </div>
    </div>
  )
}
