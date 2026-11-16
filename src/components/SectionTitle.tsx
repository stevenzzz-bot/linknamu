/** 섹션 제목 — 장식 없이 크기와 굵기만으로 */
export default function SectionTitle({ id, children, note }: { id: string; children: React.ReactNode; note?: React.ReactNode }) {
  return (
    <div className="reveal flex items-baseline justify-between gap-3 border-b-2 border-heading pb-3">
      <h2 id={id} className="text-[22px] font-extrabold leading-tight text-heading">
        {children}
      </h2>
      {note && <p className="flex-none text-sm text-muted">{note}</p>}
    </div>
  );
}
