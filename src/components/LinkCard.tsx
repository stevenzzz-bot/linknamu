"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import type { LinkItem } from "@/config/profile";

type Props = { link: LinkItem; clicks: number; showClicks: boolean };

const fmt = (n: number) => `${n.toLocaleString("ko-KR")}회`;

export default function LinkCard({ link, clicks, showClicks }: Props) {
  const [count, setCount] = useState(clicks);
  const featured = Boolean(link.featured);

  return (
    <a
      href={`/go/${encodeURIComponent(link.id)}`}
      target="_blank"
      rel="noopener noreferrer"
      // 실제 집계는 /go 라우트가 한다. 여기선 화면 숫자만 즉시 갱신.
      onClick={() => setCount((c) => c + 1)}
      className={[
        "group flex min-h-[72px] items-center gap-3 rounded-2xl px-4 py-3.5 transition hover:-translate-y-0.5 active:translate-y-0",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none",
        featured
          ? "bg-accent text-white shadow-md hover:shadow-lg"
          : "border border-gray-200 bg-white shadow-sm hover:border-accent dark:border-gray-800 dark:bg-gray-900",
      ].join(" ")}
    >
      <span
        className={`grid h-10 w-10 flex-none place-items-center rounded-xl ${
          featured ? "bg-white/15" : "bg-accent/10 text-accent"
        }`}
      >
        <Icon name={link.icon} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold [word-break:keep-all]">{link.title}</span>
        {link.description && (
          <span
            className={`mt-0.5 block text-sm [word-break:keep-all] ${
              featured ? "text-white/85" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {link.description}
          </span>
        )}
      </span>
      {showClicks && (
        <span
          className={`flex-none text-xs tabular-nums ${featured ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}
          aria-label={`클릭 ${fmt(count)}`}
        >
          {fmt(count)}
        </span>
      )}
      <Icon
        name="arrow"
        className={`h-5 w-5 flex-none transition group-hover:translate-x-0.5 motion-reduce:transition-none ${
          featured ? "text-white" : "text-gray-400 group-hover:text-accent dark:text-gray-500"
        }`}
      />
    </a>
  );
}
