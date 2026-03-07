'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-deep text-text-primary">
      <h2 className="mb-4 font-heading text-2xl">문제가 발생했습니다</h2>
      <p className="mb-8 text-text-secondary">{error.message}</p>
      <button
        onClick={reset}
        className="rounded-lg bg-accent px-6 py-3 text-bg-deep transition-colors hover:bg-accent-glow"
      >
        다시 시도
      </button>
    </div>
  )
}
