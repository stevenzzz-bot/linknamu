"use client";

import { useState } from "react";
import Image from "next/image";
import type { Profile } from "@/config/profile";

/**
 * 홍보 영상 — 평소에는 링크 카드와 같은 높이의 썸네일 카드로 두고,
 * 누르면 그 자리에서 세로 영상이 펼쳐져 재생된다 (그 전에는 영상을 받지 않음).
 */
export default function PromoVideo({ video }: { video: Profile["video"] }) {
  const [open, setOpen] = useState(false);
  if (!video) return null;

  if (open) {
    return (
      <div className="mt-2.5">
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
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mx-auto mt-2 flex min-h-11 items-center px-3 text-sm text-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
        >
          영상 닫기
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="group mt-2.5 flex w-full items-center gap-3 rounded-2xl border border-line bg-surface py-2.5 pl-2.5 pr-5 text-left transition hover:border-ink active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
    >
      <span className="relative h-[72px] w-[41px] flex-none overflow-hidden rounded-lg bg-ink">
        <Image src={video.poster} alt="" fill sizes="41px" className="object-cover" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="title block text-base font-bold leading-snug">15초 영상으로 보기</span>
        <span className="mt-1 block text-sm leading-snug text-muted">소리 없이 바로 재생돼요</span>
      </span>
      <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-ink text-white" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor">
          <path d="M8 5.5v13l10.5-6.5z" />
        </svg>
      </span>
    </button>
  );
}
