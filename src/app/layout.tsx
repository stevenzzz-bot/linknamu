import type { Metadata, Viewport } from "next";
import ThemeScript from "@/components/ThemeScript";
import { profile } from "@/config/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} | 링크나무`,
  description: profile.bio || "내 모든 링크를 한 페이지에",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // ThemeScript 가 렌더 전에 class 를 바꾸므로 hydration 경고 억제
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-[#f4f7f5] font-sans text-gray-900 antialiased transition-colors dark:bg-gray-950 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
