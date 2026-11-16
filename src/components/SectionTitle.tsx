/** 섹션 대제목 — 짧은 회색 선 + 굵고 큰 제목 (포인트색은 별점·가격에만 쓴다) */
export default function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div>
      <span aria-hidden="true" className="block h-[3px] w-6 rounded-full bg-rule" />
      <h2 id={id} className="mt-3 text-[22px] font-extrabold leading-tight text-heading">
        {children}
      </h2>
    </div>
  );
}
