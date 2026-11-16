"use client";

import { useState } from "react";
import BrandMark from "@/components/BrandMark";
import type { LinkItem, Profile } from "@/config/profile";

type Props = {
  links: LinkItem[];
  video?: Profile["video"];
  /** 펼친 영상 아래에 붙는 유튜브(조립 영상) 링크 */
  videoLink?: LinkItem;
};

const tile =
  "flex min-h-[92px] flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-surface px-2 py-3 text-center text-sm font-bold text-ink transition hover:border-ink active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none";

/** 보조 링크 3열 아이콘 버튼 + 영상 (누르면 아래로 펼쳐 재생) */
export default function LinkGrid({ links, video, videoLink }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rise mt-2.5" style={{ "--i": 6 } as React.CSSProperties}>
      <ul className="grid grid-cols-3 gap-2.5" aria-label="더보기 링크">
        {links.map((l) => (
          <li key={l.id}>
            <a href={`/go/${encodeURIComponent(l.id)}`} target="_blank" rel="nofollow noopener noreferrer" className={tile}>
              {l.mark && <BrandMark name={l.mark} />}
              <span className="title">{l.short ?? l.title}</span>
            </a>
          </li>
        ))}
        {video && (
          <li>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className={`${tile} w-full`}>
              <BrandMark name="youtube" />
              <span className="title">{open ? "영상 닫기" : "영상 보기"}</span>
            </button>
          </li>
        )}
      </ul>

      {video && open && (
        <div className="mt-3">
          <video
            className="mx-auto block aspect-[9/16] w-full max-w-[340px] rounded-[20px] border border-line bg-ink object-cover"
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            muted
            playsInline
            loop
            aria-label={video.label}
          />
          {videoLink && (
            <a
              href={`/go/${encodeURIComponent(videoLink.id)}`}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="mx-auto mt-2 flex min-h-11 w-fit items-center gap-1 px-3 text-sm font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
            >
              유튜브에서 {videoLink.title.replace(/ 보기$/, "")} 보기 →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
