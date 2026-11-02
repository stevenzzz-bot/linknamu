"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/components/ThemeScript";

export default function ThemeToggle() {
  // 서버 렌더 시점엔 테마를 모르므로 마운트 후 실제 상태를 읽는다.
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* 저장 불가 환경(시크릿 모드 등) — 이번 세션에만 적용 */
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark ?? undefined}
      aria-label={dark ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
      className="fixed right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-lg shadow-sm transition hover:border-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-dark"
    >
      <span aria-hidden="true" className="dark:hidden">☀️</span>
      <span aria-hidden="true" className="hidden dark:inline">🌙</span>
    </button>
  );
}
