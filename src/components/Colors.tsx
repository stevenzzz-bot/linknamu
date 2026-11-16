import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import type { Profile } from "@/config/profile";

/** 제품·색상 고르기 — 제품마다 같은 방에서 찍은 두 색상을 나란히 */
export default function Colors({ products }: { products: Profile["products"] }) {
  if (products.length === 0) return null;
  return (
    <section className="mt-16" aria-labelledby="colors-title">
      <SectionTitle id="colors-title" note="배송비 포함 가격">
        제품·색상 고르기
      </SectionTitle>
      {products.map((p, i) => (
        <div key={p.name} className={`reveal ${i > 0 ? "mt-10" : "mt-5"}`}>
          <h3 className="text-lg font-extrabold text-heading">
            {p.name} <span className="ml-1 text-[15px] font-medium text-muted">{p.desc}</span>
          </h3>
          <ul className="mt-3 grid grid-cols-2 gap-3">
            {p.colors.map((c) => (
              <li key={c.name}>
                <a
                  href={`/go/${encodeURIComponent(p.linkId)}`}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <span className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-placeholder">
                    <Image
                      src={c.src}
                      alt={`${c.name} ${p.name} 의자`}
                      fill
                      sizes="(max-width: 480px) 50vw, 220px"
                      className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </span>
                  <span className="mt-2.5 flex items-center gap-2">
                    <span className="h-3.5 w-3.5 flex-none rounded-full ring-1 ring-black/15" style={{ background: c.swatch }} aria-hidden="true" />
                    <span className="text-base font-bold text-heading">{c.name}</span>
                  </span>
                  <span className="mt-0.5 block text-[15px] text-ink">{c.price}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
