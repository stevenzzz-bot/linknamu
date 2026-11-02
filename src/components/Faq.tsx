import SectionTitle from "@/components/SectionTitle";
import type { Profile } from "@/config/profile";

/** 자주 묻는 질문 — 눌러서 펼치는 목록 (JS 없이 동작) */
export default function Faq({ faq }: { faq: Profile["faq"] }) {
  if (faq.length === 0) return null;
  return (
    <section className="mt-14" aria-labelledby="faq-title">
      <div className="reveal">
        <SectionTitle id="faq-title">자주 묻는 질문</SectionTitle>
      </div>
      <div className="mt-4 grid gap-2">
        {faq.map((item) => (
          <details key={item.q} className="reveal group rounded-2xl border border-line bg-surface px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold [&::-webkit-details-marker]:hidden">
              <span className="title">{item.q}</span>
              <span aria-hidden="true" className="flex-none text-muted transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-ink">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
