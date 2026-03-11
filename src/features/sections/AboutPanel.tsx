'use client'

const SKILLS = [
  { category: 'Languages', items: ['JavaScript', 'TypeScript'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'React Native', 'Three.js'] },
  { category: 'State', items: ['TanStack Query', 'Zustand', 'Valtio', 'Redux'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'Supabase'] },
  { category: 'Deploy', items: ['AWS (S3, Amplify)', 'GitHub Actions', 'Google Play', 'App Store'] },
]

export function AboutPanel() {
  return (
    <div className="flex flex-col gap-6 max-w-md">
      <h2
        className="font-heading text-text-primary tracking-wider"
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600 }}
      >
        About
      </h2>

      <p className="font-body text-text-secondary leading-relaxed" style={{ fontSize: '0.9rem' }}>
        TypeScript와 JavaScript를 기반으로 React Native를 활용한 크로스 플랫폼 앱 개발과
        Next.js 기반의 웹 애플리케이션 개발 경험을 보유하고 있습니다. 특히 사용자 경험 최적화에
        중점을 두어 효율적인 상태관리와 퍼포먼스 개선에 강점이 있습니다. 새로운 기술 습득과
        팀 내 지식 공유를 통해 함께 성장하는 개발 문화를 지향합니다.
      </p>

      <div>
        <h3 className="font-heading text-text-primary text-sm tracking-wide mb-2" style={{ fontWeight: 500 }}>
          Experience
        </h3>
        <div className="flex items-baseline gap-3">
          <span className="text-accent text-sm font-medium">AI 스타트업</span>
          <span className="h-px flex-1 bg-text-secondary/20" />
          <span className="text-text-secondary text-xs">모바일 앱 & 웹 앱 개발</span>
        </div>
        <p className="text-text-secondary/60 text-xs mt-1">
          2022.10 ~ 2025.02 · 총 3년 5개월
        </p>
      </div>

      <div>
        <h3 className="font-heading text-text-primary text-sm tracking-wide mb-3" style={{ fontWeight: 500 }}>
          Skills
        </h3>
        <div className="flex flex-col gap-2">
          {SKILLS.map((group) => (
            <div key={group.category} className="flex gap-2 items-start">
              <span className="text-accent text-xs min-w-[70px] pt-0.5">{group.category}</span>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full px-2.5 py-0.5 text-xs text-text-primary/80"
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
