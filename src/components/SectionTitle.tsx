/** 섹션 대제목 — 테라코타 짧은 선(브랜드 상세페이지와 같은 장식) + 굵고 큰 제목 */
export default function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div>
      <span aria-hidden="true" className="block h-[3px] w-6 rounded-full bg-point" />
      <h2 id={id} className="mt-3 text-[22px] font-extrabold leading-tight text-heading">
        {children}
      </h2>
    </div>
  );
}
