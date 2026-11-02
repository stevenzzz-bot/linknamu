import { timingSafeEqual } from "node:crypto";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { links, socials } from "@/lib/links";
import { getClickStats, getVisitStats } from "@/lib/clicks";
import { SOURCE_LABELS } from "@/lib/source";

/**
 * 사장님 전용 클릭 통계 — /stats?key=<STATS_KEY>
 * - STATS_KEY 환경 변수가 없거나 key 가 틀리면 404 (페이지가 있다는 것도 드러내지 않음).
 * - 검색엔진 수집 금지, 캐시 금지.
 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "통계",
  robots: { index: false, follow: false },
};

function keyMatches(given: string | undefined): boolean {
  // 붙여넣을 때 섞여 들어간 앞뒤 공백·줄바꿈은 무시
  const expected = process.env.STATS_KEY?.trim();
  given = given?.trim();
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

const fmtDate = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function StatsPage({ searchParams }: { searchParams: { key?: string } }) {
  if (!keyMatches(searchParams.key)) notFound();

  const [stats, visits] = await Promise.all([getClickStats(), getVisitStats()]).catch((err) => {
    console.error("[stats] 조회 실패", err);
    return [undefined, undefined] as const;
  });
  const byId = new Map((stats ?? []).map((s) => [s.id, s]));

  const rows = [
    ...links.map((l) => ({ id: l.id, name: l.title, group: "링크" })),
    ...socials.map((s) => ({ id: s.id, name: s.label, group: "SNS" })),
  ].map((r) => ({ ...r, count: byId.get(r.id)?.count ?? 0, last: byId.get(r.id)?.updatedAt ?? null }));
  const total = rows.reduce((n, r) => n + r.count, 0);
  const sorted = [...rows].sort((a, b) => b.count - a.count);

  // 유입 경로별: 방문(세션) · 클릭 · 클릭률
  const clicksBySource: Record<string, number> = {};
  for (const s of stats ?? []) {
    for (const [src, n] of Object.entries(s.bySource)) clicksBySource[src] = (clicksBySource[src] ?? 0) + n;
  }
  const totalVisits = Object.values(visits ?? {}).reduce((n, v) => n + v, 0);
  const sources = Array.from(new Set([...Object.keys(visits ?? {}), ...Object.keys(clicksBySource)]))
    .map((src) => ({ src, visits: visits?.[src] ?? 0, clicks: clicksBySource[src] ?? 0 }))
    .sort((a, b) => b.visits - a.visits || b.clicks - a.clicks);
  const rate = (c: number, v: number) => (v ? `${Math.round((c / v) * 100)}%` : "–");

  return (
    <main className="mx-auto w-full max-w-[560px] px-4 py-10">
      <h1 className="text-[26px] font-extrabold text-heading">통계</h1>
      <p className="mt-1 text-sm text-muted">누적 기준 · 검색 로봇 제외 · 이 주소는 외부에 공유하지 마세요</p>

      {stats === null && (
        <p className="mt-6 rounded-xl border border-line bg-surface px-4 py-3 text-sm">
          MONGODB_URI 가 설정되지 않아 클릭이 저장되지 않고 있습니다.
        </p>
      )}
      {stats === undefined && (
        <p className="mt-6 rounded-xl border border-line bg-surface px-4 py-3 text-sm">
          데이터베이스에 연결하지 못했습니다. 잠시 후 새로고침해 주세요.
        </p>
      )}

      <dl className="mt-6 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface py-4 text-center">
        {[
          ["방문", `${totalVisits.toLocaleString("ko-KR")}`],
          ["클릭", `${total.toLocaleString("ko-KR")}`],
          ["클릭률", rate(total, totalVisits)],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col-reverse px-1">
            <dt className="mt-1 text-sm text-muted">{label}</dt>
            <dd className="text-2xl font-bold tabular-nums text-point">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-xs text-muted">방문 = 브라우저 기준 1회 (같은 사람이 창을 닫았다 다시 오면 다시 셈)</p>

      <h2 className="mt-8 text-lg font-extrabold text-heading">어디서 왔나</h2>
      <table className="mt-3 w-full overflow-hidden rounded-2xl border border-line bg-surface text-sm">
        <thead className="border-b border-line text-left text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">유입 경로</th>
            <th className="px-2 py-3 text-right font-medium">방문</th>
            <th className="px-2 py-3 text-right font-medium">클릭</th>
            <th className="px-4 py-3 text-right font-medium">클릭률</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {sources.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-4 text-center text-muted">
                아직 기록이 없습니다
              </td>
            </tr>
          )}
          {sources.map((r) => (
            <tr key={r.src}>
              <td className="px-4 py-3 font-semibold">{SOURCE_LABELS[r.src] ?? r.src}</td>
              <td className="px-2 py-3 text-right tabular-nums">{r.visits.toLocaleString("ko-KR")}</td>
              <td className="px-2 py-3 text-right tabular-nums">{r.clicks.toLocaleString("ko-KR")}</td>
              <td className="px-4 py-3 text-right tabular-nums text-muted">{rate(r.clicks, r.visits)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-8 text-lg font-extrabold text-heading">어떤 링크를 눌렀나</h2>

      <table className="mt-3 w-full overflow-hidden rounded-2xl border border-line bg-surface text-sm">
        <thead className="border-b border-line text-left text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">링크</th>
            <th className="px-2 py-3 text-right font-medium">클릭</th>
            <th className="px-2 py-3 text-right font-medium">비율</th>
            <th className="px-4 py-3 text-right font-medium">마지막</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {sorted.map((r) => (
            <tr key={r.id}>
              <td className="px-4 py-3">
                <span className="font-semibold">{r.name}</span>
                <span className="ml-1.5 text-xs text-muted">{r.group}</span>
              </td>
              <td className="px-2 py-3 text-right font-semibold tabular-nums">{r.count.toLocaleString("ko-KR")}</td>
              <td className="px-2 py-3 text-right tabular-nums text-muted">
                {total ? `${Math.round((r.count / total) * 100)}%` : "–"}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-xs tabular-nums text-muted">
                {r.last ? fmtDate.format(r.last) : "–"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
