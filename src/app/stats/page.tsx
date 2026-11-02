import { timingSafeEqual } from "node:crypto";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { links, socials } from "@/lib/links";
import { getClickStats } from "@/lib/clicks";

/**
 * 사장님 전용 클릭 통계 — /stats?key=<STATS_KEY>
 * - STATS_KEY 환경 변수가 없거나 key 가 틀리면 404 (페이지가 있다는 것도 드러내지 않음).
 * - 검색엔진 수집 금지, 캐시 금지.
 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "클릭 통계",
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

  const stats = await getClickStats().catch((err) => {
    console.error("[stats] 조회 실패", err);
    return undefined;
  });
  const byId = new Map((stats ?? []).map((s) => [s.id, s]));

  const rows = [
    ...links.map((l) => ({ id: l.id, name: l.title, group: "링크" })),
    ...socials.map((s) => ({ id: s.id, name: s.label, group: "SNS" })),
  ].map((r) => ({ ...r, count: byId.get(r.id)?.count ?? 0, last: byId.get(r.id)?.updatedAt ?? null }));
  const total = rows.reduce((n, r) => n + r.count, 0);
  const sorted = [...rows].sort((a, b) => b.count - a.count);

  return (
    <main className="mx-auto w-full max-w-[560px] px-4 py-10">
      <h1 className="text-[26px] font-extrabold text-heading">클릭 통계</h1>
      <p className="mt-1 text-sm text-muted">링크 페이지에서 손님이 누른 횟수 (누적) · 이 주소는 외부에 공유하지 마세요</p>

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

      <div className="mt-6 rounded-2xl border border-line bg-surface px-5 py-4">
        <p className="text-sm text-muted">전체 클릭</p>
        <p className="mt-1 text-3xl font-bold tabular-nums text-point">{total.toLocaleString("ko-KR")}회</p>
      </div>

      <table className="mt-4 w-full overflow-hidden rounded-2xl border border-line bg-surface text-sm">
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
