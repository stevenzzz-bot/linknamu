"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import type { LinkItem, Profile } from "@/config/profile";

type Props = {
  /** 노란 카톡 상담 버튼 */
  kakao?: LinkItem;
  /** 그 아래 줄 목록 (얇은 구분선) */
  rows: LinkItem[];
  video?: Profile["video"];
  /** 펼친 영상 아래 유튜브(조립 영상) 링크 */
  videoLink?: LinkItem;
};

const go = (l: LinkItem) => `/go/${encodeURIComponent(l.id)}`;
const rowClass =
  "group flex min-h-[56px] w-full items-center gap-3 py-3.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

function Row({ title, desc }: { title: string; desc?: string }) {
  return (
    <>
      <span className="min-w-0 flex-1">
        <span className="title block text-[17px] font-bold leading-snug text-heading">{title}</span>
        {desc && <span className="mt-0.5 block text-[15px] leading-snug text-muted">{desc}</span>}
      </span>
      <Icon
        name="arrow"
        className="h-5 w-5 flex-none text-muted transition group-hover:translate-x-0.5 group-hover:text-ink motion-reduce:transition-none"
      />
    </>
  );
}

export default function ActionList({ kakao, rows, video, videoLink }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rise" style={{ "--i": 4 } as React.CSSProperties}>
      {kakao && (
        <a
          href={go(kakao)}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="mt-2.5 flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#FEE500] text-base font-bold text-[#191919] transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
            <path d="M12 4.2c-4.8 0-8.6 3-8.6 6.7 0 2.4 1.6 4.5 4.1 5.7l-.9 3.2c-.1.3.3.6.6.4l3.8-2.5c.3 0 .7.1 1 .1 4.8 0 8.6-3 8.6-6.8S16.8 4.2 12 4.2z" />
          </svg>
          {kakao.title}
        </a>
      )}

      <ul className="mt-6 divide-y divide-line border-y border-line" aria-label="더보기 링크">
        {rows.map((l) => (
          <li key={l.id}>
            <a href={go(l)} target="_blank" rel="nofollow noopener noreferrer" className={rowClass}>
              <Row title={l.title} />
            </a>
          </li>
        ))}
        {video && (
          <li>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className={rowClass}>
              <Row title={open ? "영상 닫기" : "15초 영상 보기"} />
            </button>
            {open && (
              <div className="pb-5">
                <video
                  className="mx-auto block aspect-[9/16] w-full max-w-[320px] rounded-2xl bg-ink object-cover"
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
                    href={go(videoLink)}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="mx-auto mt-2 flex min-h-11 w-fit items-center px-3 text-[15px] font-semibold text-ink underline underline-offset-4"
                  >
                    유튜브에서 조립 영상 보기
                  </a>
                )}
              </div>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
