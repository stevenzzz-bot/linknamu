import Icon from "@/components/Icon";
import Stars from "@/components/Stars";
import type { LinkItem } from "@/config/profile";

/** 대표 상품 카드 — 할인 전후 가격, 별점, 구매 혜택, 구매 버튼을 한 장에 */
export default function OfferCard({ link }: { link: LinkItem & { offer: NonNullable<LinkItem["offer"]> } }) {
  const o = link.offer;
  return (
    <a
      href={`/go/${encodeURIComponent(link.id)}`}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className="group block rounded-[20px] bg-ink px-5 pb-5 pt-4 text-white transition hover:bg-black active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="rounded-md bg-point-on-dark px-2 py-0.5 text-[13px] font-extrabold text-[#1d140e]">
          {o.discount} 할인
        </span>
        <span className="flex items-center gap-1.5 text-sm text-white/80">
          <Stars className="text-point-on-dark" />
          <span>별점 4.9</span>
        </span>
      </span>

      <span className="title mt-3 block text-lg font-bold leading-snug">{o.name}</span>

      <span className="mt-1.5 flex items-baseline gap-2">
        <s className="text-[15px] text-white/50">{o.was}</s>
        <span className="text-[30px] font-extrabold leading-none tracking-[-0.03em] text-point-on-dark">{o.now}</span>
        {o.shipping && <span className="text-[15px] font-bold text-white">{o.shipping}</span>}
      </span>

      {o.effective && (
        <span className="mt-1.5 block text-[13px] text-white/70">
          리뷰 적립 시 체감가 <strong className="font-bold text-white">{o.effective}</strong>
        </span>
      )}

      <span className="mt-3 flex flex-wrap gap-1.5">
        {o.perks.map((p) => (
          <span key={p} className="rounded-full border border-white/20 px-2.5 py-1 text-[13px] text-white/85">
            {p}
          </span>
        ))}
      </span>

      <span className="mt-4 flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-white text-[15px] font-bold text-ink">
        {o.cta}
        <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-0.5 motion-reduce:transition-none" />
      </span>
    </a>
  );
}
