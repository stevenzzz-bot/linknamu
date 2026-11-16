import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import type { Profile } from "@/config/profile";

/** 색상 고르기 — 같은 방에서 찍은 두 색상을 나란히 */
export default function Colors({ colors, href }: { colors: Profile["colors"]; href: string }) {
  if (colors.length === 0) return null;
  return (
    <section className="mt-16" aria-labelledby="colors-title">
      <SectionTitle id="colors-title" note="하이백">
        색상 고르기
      </SectionTitle>
      <ul className="reveal mt-4 grid grid-cols-2 gap-3">
        {colors.map((c) => (
          <li key={c.name}>
            <a
              href={href}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <span className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-placeholder">
                <Image src={c.src} alt={`${c.name} 하이백 의자`} fill sizes="(max-width: 480px) 50vw, 220px" className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none" />
              </span>
              <span className="mt-2.5 flex items-center gap-2">
                <span className="h-3.5 w-3.5 flex-none rounded-full ring-1 ring-black/15" style={{ background: c.swatch }} aria-hidden="true" />
                <span className="text-base font-bold text-heading">{c.name}</span>
              </span>
              <span className="mt-0.5 block text-[15px] text-ink">{c.price}</span>
              <span className="block text-sm text-muted">{c.mood}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
