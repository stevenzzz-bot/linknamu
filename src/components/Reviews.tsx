import SectionTitle from "@/components/SectionTitle";
import Stars from "@/components/Stars";
import type { Profile } from "@/config/profile";

/** 구매자 리뷰 — 카드·태그 없이 인용문 타이포그래피로 */
export default function Reviews({ reviews, tags = [] }: { reviews: Profile["reviews"]; tags?: string[] }) {
  return (
    <section className="mt-16" aria-labelledby="reviews-title">
      <SectionTitle
        id="reviews-title"
        note={
          <>
            <Stars label="별점 5점 만점에 4.9점" className="mr-1 text-point" />
            4.9
          </>
        }
      >
        구매자 리뷰
      </SectionTitle>
      {tags.length > 0 && (
        <p className="reveal mt-4 text-[15px] leading-relaxed text-muted">
          자주 나온 말 <span className="font-semibold text-ink">{tags.map((t) => `“${t}”`).join("  ")}</span>
        </p>
      )}
      <ul className="mt-2 divide-y divide-line">
        {reviews.map((r) => (
          <li key={r.text} className="reveal py-6">
            <blockquote className="text-[17px] font-medium leading-[1.65] text-heading">{r.text}</blockquote>
            <p className="mt-3 text-sm text-muted">
              {r.author} · {r.source}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
