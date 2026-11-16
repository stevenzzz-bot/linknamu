import Icon from "@/components/Icon";
import SectionTitle from "@/components/SectionTitle";
import type { Profile } from "@/config/profile";

/** 앉아보면 다른 점 — 구매자 리뷰에 나온 특징 4가지 (2×2) */
export default function Features({ features }: { features: Profile["features"] }) {
  if (features.length === 0) return null;
  return (
    <section className="mt-14" aria-labelledby="features-title">
      <div className="reveal">
        <SectionTitle id="features-title">앉아보면 다른 점</SectionTitle>
        <p className="mt-1.5 text-sm text-muted">구매자 리뷰에서 직접 나온 이야기예요</p>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-2.5">
        {features.map((f) => (
          <li key={f.title} className="reveal rounded-2xl border border-line bg-surface px-4 py-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-bg text-ink">
              <Icon name={f.icon} className="h-6 w-6" />
            </span>
            <p className="title mt-3 text-[15px] font-bold leading-snug">{f.title}</p>
            <p className="mt-1 text-sm leading-snug text-muted">{f.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
