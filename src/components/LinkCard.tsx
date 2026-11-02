"use client";

import { useState } from "react";
import type { LinkItem } from "@/config/profile";

type Props = { link: LinkItem; clicks: number; showClicks: boolean };

const fmt = (n: number) => `${n.toLocaleString("ko-KR")}회`;

export default function LinkCard({ link, clicks, showClicks }: Props) {
  const [count, setCount] = useState(clicks);

  return (
    <a
      href={`/go/${encodeURIComponent(link.id)}`}
      target="_blank"
      rel="noopener noreferrer"
      title={link.url}
      // 실제 집계는 /go 라우트가 한다. 여기선 화면 숫자만 즉시 갱신.
      onClick={() => setCount((c) => c + 1)}
      className="group flex min-h-[60px] items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-brand active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand-dark"
    >
      <span
        aria-hidden="true"
        className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-brand-light text-lg dark:bg-brand-deep"
      >
        {link.icon ?? "🔗"}
      </span>
      <span className="min-w-0 flex-1 truncate font-semibold">{link.title}</span>
      {showClicks && (
        <span
          className="flex-none text-xs tabular-nums text-gray-500 dark:text-gray-400"
          aria-label={`클릭 ${fmt(count)}`}
        >
          {fmt(count)}
        </span>
      )}
    </a>
  );
}
