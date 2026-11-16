import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import Stars from "@/components/Stars";
import type { Profile } from "@/config/profile";

/** 구매자 리뷰 — 카드·태그 없이 인용문 타이포그래피로 */
type Props = { reviews: Profile["reviews"]; photos?: Profile["photoReviews"]; tags?: string[] };

export default function Reviews({ reviews, photos = [], tags = [] }: Props) {
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
      {photos.length > 0 && (
        <ul
          className="reveal -mx-5 mt-4 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="구매자 사진 리뷰 (옆으로 넘겨보세요)"
        >
          {photos.map((p) => (
            <li key={p.src} className="w-[236px] flex-none snap-start">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-placeholder">
                <Image src={p.src} alt="구매자가 찍은 의자 사진" fill sizes="236px" className="object-cover" />
              </div>
              <p className="mt-3 line-clamp-4 text-[15px] leading-relaxed text-heading">{p.text}</p>
              <p className="mt-1.5 text-[13px] text-muted">{p.meta}</p>
            </li>
          ))}
        </ul>
      )}
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
