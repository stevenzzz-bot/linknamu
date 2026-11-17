import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import Stars from "@/components/Stars";
import type { Profile } from "@/config/profile";

/** 구매자 사진 리뷰 — 옆으로 넘겨보는 한 줄 */
export default function Reviews({ photos = [] }: { photos?: Profile["photoReviews"] }) {
  if (photos.length === 0) return null;
  return (
    <section className="mt-16" aria-labelledby="reviews-title">
      <div className="flex items-baseline justify-between gap-3">
        <SectionTitle id="reviews-title">구매자 리뷰</SectionTitle>
        <span className="flex-none text-sm text-muted">
          <Stars label="별점 5점 만점에 4.9점" className="mr-1 text-point" />
          4.9
        </span>
      </div>
      <ul
        className="reveal -mx-5 mt-4 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="구매자 사진 리뷰 (옆으로 넘겨보세요)"
      >
        {photos.map((p) => (
          <li key={p.src} className="w-[200px] flex-none snap-start">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-placeholder">
              <Image src={p.src} alt="구매자가 찍은 의자 사진" fill sizes="200px" className="object-cover" />
            </div>
            <p className="mt-2.5 line-clamp-2 text-[15px] leading-snug text-heading">{p.text}</p>
            <p className="mt-1 text-[13px] text-muted">{p.meta}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
