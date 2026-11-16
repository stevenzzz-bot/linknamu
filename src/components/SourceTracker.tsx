"use client";

import { useEffect } from "react";

/**
 * 1) 주소의 ?from= 값을 기억해 두고(이번 브라우저 세션 동안), /go 링크를 누를 때 붙여
 *    어느 경로로 온 손님이 어떤 링크를 눌렀는지 집계되게 한다.
 *    나중에 펼쳐지는 링크도 잡히도록 페이지 전체의 클릭을 받아 처리한다.
 * 2) 세션당 한 번 방문을 기록한다 (JS 를 실행하지 않는 로봇은 자연히 빠진다).
 */
export default function SourceTracker() {
  useEffect(() => {
    let from = new URLSearchParams(window.location.search).get("from");
    try {
      if (from) sessionStorage.setItem("lnk-from", from);
      else from = sessionStorage.getItem("lnk-from");
    } catch {
      /* 저장 불가(시크릿 모드 등) — 이번 페이지에만 적용 */
    }
    const source = from || "direct";

    const tag = (e: Event) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="/go/"]') as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.getAttribute("href")!, window.location.origin);
      url.searchParams.set("from", source);
      a.setAttribute("href", url.pathname + url.search);
    };
    // 마우스·터치·키보드(Enter)·휠 클릭 모두 이동 전에 꼬리표를 붙인다
    document.addEventListener("pointerdown", tag, true);
    document.addEventListener("click", tag, true);
    document.addEventListener("auxclick", tag, true);

    let visited = false;
    try {
      visited = Boolean(sessionStorage.getItem("lnk-visited"));
      if (!visited) sessionStorage.setItem("lnk-visited", "1");
    } catch {
      /* 저장 불가 — 방문은 기록하되 중복될 수 있음 */
    }
    if (!visited && !navigator.sendBeacon?.("/api/visit", source)) {
      fetch("/api/visit", { method: "POST", body: source, keepalive: true }).catch(() => {});
    }

    return () => {
      document.removeEventListener("pointerdown", tag, true);
      document.removeEventListener("click", tag, true);
      document.removeEventListener("auxclick", tag, true);
    };
  }, []);

  return null;
}
