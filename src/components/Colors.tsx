"use client";

import { useState } from "react";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import type { Profile } from "@/config/profile";

type Product = Profile["products"][number];

/** 제품 하나 = 사진 한 장 + 색상 스와치. 스와치를 누르면 사진과 가격이 바뀐다 */
function ProductPick({ p }: { p: Product }) {
  const [i, setI] = useState(0);
  const c = p.colors[i];
  return (
    <li className="reveal min-w-0">
      <a
        href={`/go/${encodeURIComponent(p.linkId)}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <span className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-placeholder">
          {p.colors.map((col, k) => (
            <Image
              key={col.src}
              src={col.src}
              alt={`${col.name} ${p.name} 의자`}
              fill
              sizes="(max-width: 480px) 50vw, 220px"
              className={`object-cover transition-opacity duration-300 motion-reduce:transition-none ${k === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </span>
        <span className="mt-3 block text-lg font-extrabold leading-tight text-heading">{p.name}</span>
        <span className="mt-0.5 block text-[15px] text-ink">{c.price}</span>
      </a>
      <div className="mt-2 flex items-center gap-2" role="radiogroup" aria-label={`${p.name} 색상`}>
        {p.colors.map((col, k) => (
          <button
            key={col.name}
            type="button"
            role="radio"
            aria-checked={k === i}
            aria-label={col.name}
            onClick={() => setI(k)}
            className="grid h-11 w-11 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
          >
            <span
              className={`h-6 w-6 rounded-full ring-1 ring-black/15 ${k === i ? "outline outline-2 outline-offset-2 outline-heading" : ""}`}
              style={{ background: col.swatch }}
            />
          </button>
        ))}
        <span className="text-sm text-muted">{c.name}</span>
      </div>
    </li>
  );
}

export default function Colors({ products }: { products: Profile["products"] }) {
  if (products.length === 0) return null;
  return (
    <section className="mt-16" aria-labelledby="colors-title">
      <SectionTitle id="colors-title" note="배송비 포함">
        제품·색상 고르기
      </SectionTitle>
      <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6">
        {products.map((p) => (
          <ProductPick key={p.name} p={p} />
        ))}
      </ul>
    </section>
  );
}
