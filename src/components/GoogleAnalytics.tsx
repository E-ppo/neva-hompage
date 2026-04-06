// GA4 스크립트 로더 — layout.tsx에서 사용
// next/script afterInteractive로 메인 번들과 분리
'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { GA_ID, pageview } from '@/lib/analytics'

export function GoogleAnalytics() {
  const pathname = usePathname()

  // App Router 라우트 변경 시 페이지뷰 전송
  useEffect(() => {
    if (pathname) pageview(pathname)
  }, [pathname])

  // GA ID가 없거나 개발 환경이면 스크립트 로드하지 않음
  if (!GA_ID || process.env.NODE_ENV === 'development') return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  )
}
