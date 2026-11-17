"use client";

import { useEffect, useState } from "react";

/**
 * 출고 마감 타이머 — 출고일 오후 2시(한국 시간) 전에만 남은 시간을 보여주고,
 * 마감 뒤에는 숫자 없이 다음 출고일만 알려준다.
 * 매일 실제 마감 시각 기준이라 들어올 때마다 리셋되는 가짜 타이머가 아니다.
 * 출고일: 일~금 (토요일 휴무). 공휴일은 반영하지 않음.
 */
const CUTOFF_HOUR = 14;
const SHIP_DAYS = [0, 1, 2, 3, 4, 5]; // 0=일 … 6=토
const DAY = ["일", "월", "화", "수", "목", "금", "토"];

function kstNow() {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Seoul",
      hourCycle: "h23",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      weekday: "short",
    })
      .formatToParts(new Date())
      .map((x) => [x.type, x.value]),
  );
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
  return { wd, secs: +p.hour * 3600 + +p.minute * 60 + +p.second };
}

/** 다음 출고 마감까지 남은 초와, 그 마감이 며칠 뒤인지 */
function compute(): { left: number; inDays: number; wd: number } {
  const { wd, secs } = kstNow();
  for (let d = 0; d < 8; d++) {
    const day = (wd + d) % 7;
    if (!SHIP_DAYS.includes(day)) continue;
    if (d === 0 && secs >= CUTOFF_HOUR * 3600) continue;
    return { left: d * 86400 + CUTOFF_HOUR * 3600 - secs, inDays: d, wd: day };
  }
  return { left: 0, inDays: 0, wd };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function ShipTimer({ arrival }: { arrival: string }) {
  const [s, setS] = useState<ReturnType<typeof compute> | null>(null);

  useEffect(() => {
    setS(compute());
    const t = setInterval(() => setS(compute()), 1000);
    return () => clearInterval(t);
  }, []);

  const today = s?.inDays === 0;
  const label = !s || today ? "당일 출고 마감까지" : `지금 주문하면 ${s.inDays === 1 ? "내일" : `${DAY[s.wd]}요일`} 출고`;

  return (
    <span className="mt-4 block border-t border-white/15 pt-4" aria-live="off">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-[15px] font-semibold text-white">{label}</span>
        {today && s && (
          <span className="text-xl font-extrabold tabular-nums tracking-[-0.01em] text-point-on-dark">
            {pad(Math.floor(s.left / 3600))}:{pad(Math.floor((s.left % 3600) / 60))}:{pad(s.left % 60)}
          </span>
        )}
      </span>
      <span className="mt-1 block text-[13px] text-white/65">오후 2시 전 주문 당일 출고 · {arrival}</span>
    </span>
  );
}
