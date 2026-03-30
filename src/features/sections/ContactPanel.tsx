'use client'

import { useEffect, useState } from 'react'

const CONTACT_LINKS = [
  {
    label: 'Email',
    href: 'mailto:amorosso88@gmail.com',
    display: 'amorosso88@gmail.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/E-ppo',
    display: 'github.com/E-ppo',
  },
]

// 꼬리 포함 말풍선 — 꼬리 영역(4%)을 본체 안에 포함
// 0,0 → 좌상단, 1,1 → 우하단
// 꼬리: 좌측 중앙 (0~0.04 영역)
const BUBBLE_CLIP = `polygon(
  0.04em 0%,
  100% 0%,
  100% 100%,
  0.04em 100%,
  0.04em 58%,
  0% 50%,
  0.04em 42%
)`

// polygon은 %로
const BUBBLE_CLIP_PCT = `polygon(
  4% 0%,
  96% 0%,
  100% 4%,
  100% 96%,
  96% 100%,
  4% 100%,
  0% 100%,
  0% 58%,
  -4% 50%,
  0% 42%,
  0% 0%
)`

export function ContactPanel() {
  const [isMd, setIsMd] = useState(false)

  useEffect(() => {
    const check = () => setIsMd(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div className="relative max-w-[280px] sm:max-w-sm lg:max-w-md">
      {/* PC: 배경 SVG 말풍선 */}
      {isMd && (
        <svg
          className="absolute -left-[14px] top-0 w-[calc(100%+14px)] h-full"
          viewBox="0 0 400 250"
          preserveAspectRatio="none"
          style={{ filter: 'drop-shadow(0 8px 32px rgba(0, 0, 0, 0.3))' }}
        >
          <path
            d="
              M 30 0
              H 384
              Q 400 0, 400 16
              V 234
              Q 400 250, 384 250
              H 30
              Q 14 250, 14 234
              V 140
              L 0 125
              L 14 110
              V 16
              Q 14 0, 30 0
              Z
            "
            fill="rgba(15, 13, 11, 0.75)"
          />
        </svg>
      )}

      {/* 모바일: 일반 둥근 패널 배경 */}
      {!isMd && (
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'rgba(15, 13, 11, 0.75)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        />
      )}

      {/* 콘텐츠 */}
      <div className={`relative z-10 p-3 sm:p-4 lg:p-6 ${isMd ? 'pl-7 lg:pl-9' : ''}`}>
        <div className="flex flex-col gap-3 sm:gap-5 lg:gap-6">
          <h2
            className="font-heading text-text-primary tracking-wider"
            style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 600 }}
          >
            Contact
          </h2>

          <p
            className="font-body text-text-secondary leading-relaxed break-keep"
            style={{ fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)' }}
          >
            Got something in mind? Let&#39;s craft it.
          </p>

          <div className="flex flex-col gap-2 sm:gap-3">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group flex items-center gap-2 sm:gap-3 transition-all duration-300"
              >
                <span className="text-accent text-xs sm:text-sm font-medium min-w-[50px] sm:min-w-[55px]">
                  {link.label}
                </span>
                <span className="h-px flex-1 bg-text-secondary/20" />
                <span className="text-text-secondary text-xs sm:text-xs group-hover:text-text-primary transition-colors duration-300">
                  {link.display}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
