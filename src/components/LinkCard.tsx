import BrandMark from "@/components/BrandMark";
import Icon from "@/components/Icon";
import type { LinkItem } from "@/config/profile";

export default function LinkCard({ link }: { link: LinkItem }) {
  const featured = Boolean(link.featured);
  const sub = featured ? "text-white/80" : "text-muted";

  return (
    <a
      href={`/go/${encodeURIComponent(link.id)}`}
      target="_blank"
      rel="noopener noreferrer"
      // 클릭 수는 /go 라우트가 집계한다. 손님 화면에는 표시하지 않음 (/stats 에서 확인).
      className={[
        "group flex min-h-16 items-center gap-3 rounded-2xl px-5 py-3 transition active:scale-[0.99]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none",
        featured ? "bg-ink text-white hover:bg-black" : "border border-line bg-surface hover:border-ink",
      ].join(" ")}
    >
      {link.mark && <BrandMark name={link.mark} />}
      <span className="min-w-0 flex-1">
        <span className="title block text-base font-bold leading-snug">{link.title}</span>
        {link.description && (
          <span className={`mt-1 block text-sm leading-snug ${sub}`}>
            {link.showStars && (
              <span className="mr-1.5 tracking-[0.1em] text-point" aria-hidden="true">
                ★★★★★
              </span>
            )}
            {link.description}
          </span>
        )}
      </span>
      <Icon
        name="arrow"
        className={`h-5 w-5 flex-none transition group-hover:translate-x-0.5 motion-reduce:transition-none ${
          featured ? "text-white" : "text-muted group-hover:text-ink"
        }`}
      />
    </a>
  );
}
