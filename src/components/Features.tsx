import SectionTitle from "@/components/SectionTitle";
import type { Profile } from "@/config/profile";

/** 앉아보면 다른 점 — 구매자 리뷰에 나온 특징. 아이콘·카드 없이 정의 목록으로 */
export default function Features({ features }: { features: Profile["features"] }) {
  if (features.length === 0) return null;
  return (
    <section className="mt-16" aria-labelledby="features-title">
      <SectionTitle id="features-title" note="구매자 리뷰 기준">
        앉아보면 다른 점
      </SectionTitle>
      <dl className="reveal divide-y divide-line">
        {features.map((f) => (
          <div key={f.title} className="grid grid-cols-[8.5rem_1fr] gap-3 py-4">
            <dt className="text-base font-bold text-heading">{f.title}</dt>
            <dd className="text-base text-ink">{f.desc}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
