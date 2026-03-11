'use client'

const SECTIONS = [
  {
    id: 'hero',
    title: 'NEVA',
    subtitle: 'From blank canvas to living interface.',
  },
  {
    id: 'about',
    title: 'About',
    description: 'Frontend Developer specializing in interactive 3D web experiences.',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Coming soon.',
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'Coming soon.',
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Get in touch.',
  },
] as const

export function MobileFallback() {
  return (
    <div className="min-h-screen bg-bg-deep text-text-primary">
      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="flex min-h-screen flex-col items-center justify-center px-6 py-20"
        >
          <h2
            className="font-heading tracking-wider"
            style={{
              fontSize: section.id === 'hero' ? 'clamp(3rem, 10vw, 5rem)' : 'clamp(1.5rem, 5vw, 2.5rem)',
              letterSpacing: section.id === 'hero' ? '0.3em' : '0.1em',
              fontWeight: 600,
            }}
          >
            {section.title}
          </h2>
          {'subtitle' in section && (
            <p className="mt-6 font-body text-text-secondary italic"
              style={{ fontSize: 'clamp(0.875rem, 2vw, 1.1rem)' }}
            >
              {section.subtitle}
            </p>
          )}
          {'description' in section && (
            <p className="mt-4 font-body text-text-secondary text-center max-w-md"
              style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
            >
              {section.description}
            </p>
          )}
        </section>
      ))}
    </div>
  )
}
