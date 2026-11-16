"use client";

import { useEffect, useState } from "react";

/**
 * 당일 출고 마감 타이머 — 평일 오후 2시(한국 시간)까지 남은 시간.
 * 매일 실제 마감 시각을 기준으로 하므로 들어올 때마다 리셋되는 가짜 타이머가 아니다.
 * 주말·마감 이후에는 다음 영업일 출고를 안내한다. (공휴일은 반영하지 않음)
 */
const CUTOFF_HOUR = 14;
const DAY = ["일", "월", "화", "수", "목", "금", "토"];

function kstNow() {
  // 한국 시간의 연·월·일·시·분·초를 브라우저 시간대와 무관하게 얻는다
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Seoul",
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      weekday: "short",
    })
      .formatToParts(new Date())
      .map((x) => [x.type, x.value]),
  );
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
  return { wd, h: +p.hour, m: +p.minute, s: +p.second };
}

type State = { kind: "today"; left: number } | { kind: "next"; day: string } | null;

function compute(): State {
  const { wd, h, m, s } = kstNow();
  const isWeekday = wd >= 1 && wd <= 5;
  const secs = h * 3600 + m * 60 + s;
  if (isWeekday && secs < CUTOFF_HOUR * 3600) return { kind: "today", left: CUTOFF_HOUR * 3600 - secs };
  // 다음 영업일
  let d = (wd + 1) % 7;
  while (d === 0 || d === 6) d = (d + 1) % 7;
  return { kind: "next", day: d === (wd + 1) % 7 ? "내일" : `${DAY[d]}요일` };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function ShipTimer({ arrival }: { arrival: string }) {
  const [state, setState] = useState<State>(null);

  useEffect(() => {
    setState(compute());
    const t = setInterval(() => setState(compute()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="mt-4 block border-t border-white/15 pt-4" aria-live="off">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-[15px] font-semibold text-white">
          {state?.kind === "next" ? `지금 주문하면 ${state.day} 출고` : "당일 출고 마감까지"}
        </span>
        {state?.kind === "today" && (
          <span className="text-xl font-extrabold tabular-nums tracking-[-0.01em] text-point-on-dark">
            {pad(Math.floor(state.left / 3600))}:{pad(Math.floor((state.left % 3600) / 60))}:{pad(state.left % 60)}
          </span>
        )}
      </span>
      <span className="mt-1 block text-[13px] text-white/65">
        평일 오후 2시 전 주문 시 당일 출고 · {arrival}
      </span>
    </span>
  );
}
