import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { TierProvider } from '@/features/tier'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Neva-home | eppo - Frontend Developer',
  description: 'Three.js 스크롤 드리븐 3D 경험으로 만나는 프론트엔드 개발자 eppo의 포트폴리오',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <TierProvider>{children}</TierProvider>
      </body>
    </html>
  )
}
