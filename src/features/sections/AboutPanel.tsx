'use client'

const SKILLS = [
  { category: 'Languages', items: ['JavaScript', 'TypeScript'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'React Native', 'Three.js'] },
  { category: 'State', items: ['TanStack Query', 'Zustand', 'Valtio', 'Redux'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'Supabase'] },
  {
    category: 'Deploy',
    items: ['AWS (S3, Amplify)', 'GitHub Actions', 'Google Play', 'App Store'],
  },
]

export function AboutPanel() {
  return (
    <div className="flex flex-col gap-4 lg:gap-6 max-w-sm lg:max-w-md">
      <h2
        className="font-heading text-text-primary tracking-wider"
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600 }}
      >
        About
      </h2>

      <p
        className="font-body text-text-secondary leading-relaxed whitespace-pre-line"
        style={{ fontSize: '0.9rem' }}
      >
        {`동작하는 기능 너머, 사용자가 다시 찾게 되는 서비스를 지향합니다.\n프로토타입 단계부터 직접 써보며 사용성을 검증하고, 
        기획자·디자이너와 적극적으로 소통하며 "만들기 쉬운 것"보다 
        "쓰기 좋은 것"을 만드는 데 집중합니다.\nReact Native와 React.js/Next.js를 기반으로 
        앱과 웹을 넘나들며 개발합니다.`}
      </p>

      <div>
        <h3
          className="font-heading text-text-primary text-sm tracking-wide mb-2"
          style={{ fontWeight: 500 }}
        >
          Experience
        </h3>
        <div className="flex items-baseline gap-3">
          <span className="text-accent text-sm font-medium">AI 스타트업</span>
          <span className="h-px flex-1 bg-text-secondary/20" />
          <span className="text-text-secondary text-xs">모바일 앱 & 웹 앱 개발</span>
        </div>
        <p className="text-text-secondary/60 text-xs mt-1">2022.10 ~ 2025.02 · 총 3년 5개월</p>
      </div>

      <div>
        <h3
          className="font-heading text-text-primary text-sm tracking-wide mb-3"
          style={{ fontWeight: 500 }}
        >
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
