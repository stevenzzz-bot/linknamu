/** 섹션 제목 — 선·보조문구 없이 글자 하나로 */
export default function SectionTitle({ id, children }: { id: string; children: React.ReactNode; note?: React.ReactNode }) {
  return (
    <h2 id={id} className="reveal text-xl font-extrabold leading-tight text-heading">
      {children}
    </h2>
  );
}
