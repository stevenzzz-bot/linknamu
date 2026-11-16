import type { LinkItem } from "@/config/profile";

type Offer = NonNullable<LinkItem["offer"]>;

/** 대표 상품 — 이름, 할인 전후 가격, 혜택, 구매 버튼. 칩·배지 없이 글자 위계로만 */
export default function OfferCard({ link }: { link: LinkItem & { offer: Offer } }) {
  const o = link.offer;
  return (
    <a
      href={`/go/${encodeURIComponent(link.id)}`}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className="group block rounded-2xl bg-ink px-5 py-5 text-white transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
    >
      <span className="flex items-baseline justify-between gap-3">
        <span className="title text-lg font-bold leading-snug">{o.name}</span>
        <span className="flex-none text-sm text-white/75">
          <svg viewBox="0 0 20 20" className="mr-1 inline h-[1em] w-[1em] align-[-0.125em] text-point-on-dark" fill="currentColor" aria-hidden="true">
            <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" />
          </svg>
          별점 4.9
        </span>
      </span>

      <span className="mt-4 block text-[15px] text-white/55 line-through decoration-white/40">{o.was}</span>
      <span className="mt-0.5 flex items-baseline gap-2.5">
        <span className="text-[30px] font-extrabold leading-none text-point-on-dark">{o.discount}</span>
        <span className="text-[30px] font-extrabold leading-none tracking-[-0.02em]">{o.now}</span>
      </span>
      <span className="mt-2.5 block text-[15px] leading-relaxed text-white/80">
        {[o.shipping, ...o.perks].filter(Boolean).join(" · ")}
        {o.effective && (
          <>
            <br />
            리뷰 적립 시 {o.effective}
          </>
        )}
      </span>

      <span className="mt-5 flex min-h-[52px] items-center justify-center rounded-xl bg-white text-base font-bold text-ink">
        {o.cta}
      </span>
    </a>
  );
}
