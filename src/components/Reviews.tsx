import SectionTitle from "@/components/SectionTitle";
import Stars from "@/components/Stars";
import type { Profile } from "@/config/profile";

export default function Reviews({ reviews, tags = [] }: { reviews: Profile["reviews"]; tags?: string[] }) {
  return (
    <section className="mt-14" aria-labelledby="reviews-title">
      <div className="reveal">
        <SectionTitle id="reviews-title">구매자 리뷰</SectionTitle>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
          <Stars className="text-point" />
          스마트스토어 별점 4.9
        </p>
      </div>
      {tags.length > 0 && (
        <ul className="reveal mt-4 flex flex-wrap gap-1.5" aria-label="리뷰에 많이 나온 말">
          {tags.map((t) => (
            <li key={t} className="rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-ink ring-1 ring-line">
              {t}
            </li>
          ))}
        </ul>
      )}
      <ul className="mt-4 grid gap-2">
        {reviews.map((r) => (
          <li key={r.text} className="reveal rounded-2xl border border-line bg-surface px-5 py-4">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full border border-line px-2 py-0.5 text-xs font-semibold">{r.tag}</span>
              <Stars label="별점 5점 만점에 5점" className="text-[13px] text-point" />
            </div>
            <blockquote className="mt-2.5 text-base leading-relaxed">“{r.text}”</blockquote>
            <p className="mt-2 text-[13px] text-muted">
              {r.author} · {r.source}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
