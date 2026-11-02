import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { profile } from "@/config/profile";
import "./globals.css";

const shareTitle = `${profile.name} | ${profile.bio}`;
const shareDescription = "하이백 메쉬 의자 · 5년 무상 보증 · 학원·사무실 대량 견적";

export const metadata: Metadata = {
  // 카카오톡 등 공유 미리보기의 이미지 주소를 절대경로로 만들기 위한 기준 주소
  metadataBase: new URL(profile.siteUrl),
  title: profile.name,
  description: profile.bio,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: profile.name,
    url: "/",
    title: shareTitle,
    description: shareDescription,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${profile.name} 로고` }],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f3f0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard — 페이지에 쓰인 글자만 받는 dynamic subset */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        {/* Vercel 방문자 분석 — 대시보드에서 Analytics 를 켜야 수집된다 */}
        <Analytics />
      </body>
    </html>
  );
}
