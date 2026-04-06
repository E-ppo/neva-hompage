// GA4 Analytics — 환경변수 기반 초기화 & 이벤트 헬퍼
// 개발 환경에서는 콘솔 로그만 출력, 프로덕션에서만 실제 전송

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''

const isDev = process.env.NODE_ENV === 'development'

// gtag 글로벌 타입 선언
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetOrName: string | Date,
      params?: Record<string, unknown>,
    ) => void
    dataLayer: unknown[]
  }
}

/** GA4 페이지뷰 전송 */
export function pageview(url: string) {
  if (!GA_ID) return
  if (isDev) {
    console.log('[GA4 dev] pageview:', url)
    return
  }
  window.gtag('config', GA_ID, { page_path: url })
}

/** GA4 커스텀 이벤트 전송 */
export function trackEvent(
  action: string,
  params?: Record<string, string | number>,
) {
  if (!GA_ID) return
  if (isDev) {
    console.log('[GA4 dev] event:', action, params)
    return
  }
  window.gtag('event', action, params)
}

// ── 설계된 이벤트별 헬퍼 ──

export function trackSectionView(sectionName: string) {
  trackEvent('section_view', { section_name: sectionName })
}

export function trackProjectClick(
  projectName: string,
  action: 'prev' | 'next' | 'dot' | 'detail',
) {
  trackEvent('project_click', { project_name: projectName, action })
}

export function trackOutboundLink(url: string, linkText: string) {
  trackEvent('outbound_link', { url, link_text: linkText })
}

export function trackContactClick(method: 'email' | 'github') {
  trackEvent('contact_click', { method })
}

export function trackCtaClick(buttonLabel: string) {
  trackEvent('cta_click', { button_label: buttonLabel })
}

export function trackNavClick(
  sectionName: string,
  navType: 'side' | 'top',
) {
  trackEvent('nav_click', { section_name: sectionName, nav_type: navType })
}

export function trackScrollDepth(percent: 25 | 50 | 75 | 100) {
  trackEvent('scroll_depth', { percent })
}
