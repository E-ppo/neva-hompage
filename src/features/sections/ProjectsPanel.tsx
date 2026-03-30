'use client'

import { useState } from 'react'

const PROJECTS = [
  {
    title: 'Blocky',
    description: '흩어진 할 일, 시간 위에 놓는 순간 실행이 된다.',
    image: '/images/projects/blocky/blocky-thumbnail.png',
    tags: ['React Native', 'TypeScript', 'Supabase'],
  },
]

export function ProjectsPanel() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + PROJECTS.length) % PROJECTS.length)
  const next = () => setCurrent((c) => (c + 1) % PROJECTS.length)

  const project = PROJECTS[current]

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-10 sm:gap-16 lg:gap-24 items-center md:justify-start md:pl-[8%] justify-center p-2 sm:p-4">
      {/* 좌측: 나무 액자 이미지 */}
      <div className="relative flex-shrink-0 w-full md:w-[60%] max-h-[55vh] md:max-h-[75vh]">
        {/* 나무 액자 프레임 */}
        <div
          className="rounded-md p-2 sm:p-3"
          style={{
            background:
              'linear-gradient(145deg, #c49a3c, #8B6914 30%, #D4A54A 50%, #8B6914 70%, #a07820)',
            boxShadow: `
              0 4px 20px rgba(0,0,0,0.5),
              inset 0 1px 0 rgba(255,255,255,0.15),
              inset 0 -1px 0 rgba(0,0,0,0.3)
            `,
          }}
        >
          {/* 내부 검은 매트 */}
          <div className="rounded-sm p-1 sm:p-1.5" style={{ background: '#1a1410' }}>
            <div className="relative overflow-hidden rounded-sm">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-contain"
                draggable={false}
              />
              {/* 비네팅 */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 6px 3px rgba(0,0,0,0.3)' }}
              />
            </div>
          </div>
        </div>

        {/* 화살표 (2개 이상일 때만) */}
        {PROJECTS.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute -left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 flex items-center justify-center text-lg sm:text-xl leading-none transition-all"
            >
              <span className="-mt-0.5">‹</span>
            </button>
            <button
              onClick={next}
              className="absolute -right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 flex items-center justify-center text-lg sm:text-xl leading-none transition-all"
            >
              <span className="-mt-0.5">›</span>
            </button>

            {/* 인디케이터 */}
            <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {PROJECTS.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    i === current ? 'bg-accent scale-110' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* 우측: 프로젝트 정보 */}
      <div
        className="flex flex-col gap-3 sm:gap-4 md:max-w-[35%] text-center md:text-left rounded-2xl p-4 sm:p-5 lg:p-6 backdrop-blur-xl"
        style={{
          background: 'rgba(15, 13, 11, 0.75)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h2
          className="font-heading text-text-primary tracking-wider"
          style={{ fontSize: 'clamp(1.3rem, 3vw, 2.2rem)', fontWeight: 600 }}
        >
          {project.title}
        </h2>

        <p
          className="font-body text-text-secondary leading-relaxed break-keep"
          style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)' }}
        >
          {project.description}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs text-text-primary/80"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 자세히 보기 */}
        <button
          className="mt-1 sm:mt-2 text-accent text-xs sm:text-sm hover:text-accent-glow transition-colors self-center md:self-start"
          onClick={() => alert('준비중이니 기다려주세요!')}
        >
          자세히 보기 →
        </button>
      </div>
    </div>
  )
}
