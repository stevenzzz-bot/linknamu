"use client";

import { useState } from "react";
import BrandMark from "@/components/BrandMark";
import Icon from "@/components/Icon";
import type { LinkItem } from "@/config/profile";

type Props = { link: LinkItem; clicks: number; showClicks: boolean };

const fmt = (n: number) => `${n.toLocaleString("ko-KR")}회`;

export default function LinkCard({ link, clicks, showClicks }: Props) {
  const [count, setCount] = useState(clicks);
  const featured = Boolean(link.featured);
  const sub = featured ? "text-white/80" : "text-muted";

  return (
    <a
      href={`/go/${encodeURIComponent(link.id)}`}
      target="_blank"
      rel="noopener noreferrer"
      // 실제 집계는 /go 라우트가 한다. 여기선 화면 숫자만 즉시 갱신.
      onClick={() => setCount((c) => c + 1)}
      className={[
        "group flex min-h-16 items-center gap-3 rounded-2xl px-5 py-3 transition active:scale-[0.99]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none",
        featured ? "bg-ink text-white hover:bg-black" : "border border-line bg-surface hover:border-ink",
      ].join(" ")}
    >
      {link.mark && <BrandMark name={link.mark} />}
      <span className="min-w-0 flex-1">
        <span className="title block text-base font-bold leading-snug">{link.title}</span>
        {link.description && (
          <span className={`mt-1 block text-sm leading-snug ${sub}`}>
            {link.showStars && (
              <span className="mr-1.5 tracking-[0.1em] text-point" aria-hidden="true">
                ★★★★★
              </span>
            )}
            {link.description}
          </span>
        )}
      </span>
      {showClicks && (
        <span className={`flex-none text-xs tabular-nums ${sub}`} aria-label={`클릭 ${fmt(count)}`}>
          {fmt(count)}
        </span>
      )}
      <Icon
        name="arrow"
        className={`h-5 w-5 flex-none transition group-hover:translate-x-0.5 motion-reduce:transition-none ${
          featured ? "text-white" : "text-muted group-hover:text-ink"
        }`}
      />
    </a>
  );
}
