import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-deep text-text-primary">
      <h2 className="mb-4 font-heading text-4xl">404</h2>
      <p className="mb-8 text-text-secondary">페이지를 찾을 수 없습니다</p>
      <Link
        href="/"
        className="rounded-lg bg-accent px-6 py-3 text-bg-deep transition-colors hover:bg-accent-glow"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
