import type { Profile } from "@/config/profile";

/** 숫자 3칸 — 흰 카드 하나를 세로 구분선으로 3등분 */
export default function Stats({ stats }: { stats: Profile["stats"] }) {
  return (
    <dl className="mt-6 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface py-4">
      {stats.map((s) => (
        <div key={s.value} className="flex flex-col-reverse items-center px-1 text-center">
          <dt className="mt-1 text-sm leading-snug text-muted">{s.label}</dt>
          <dd className="text-2xl font-bold tracking-[-0.02em] text-point">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
