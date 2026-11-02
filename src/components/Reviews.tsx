import SectionTitle from "@/components/SectionTitle";
import type { Profile } from "@/config/profile";

export default function Reviews({ reviews }: { reviews: Profile["reviews"] }) {
  return (
    <section className="mt-14" aria-labelledby="reviews-title">
      <SectionTitle id="reviews-title">고객 리뷰</SectionTitle>
      <ul className="mt-4 grid gap-2">
        {reviews.map((r) => (
          <li key={r.text} className="rounded-2xl border border-line bg-surface px-5 py-4">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full border border-line px-2 py-0.5 text-xs font-semibold">{r.tag}</span>
              <span className="text-xs tracking-[0.15em] text-point" aria-label="별점 5점 만점에 5점">
                ★★★★★
              </span>
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
