/** 별점 5개 — 인라인 SVG (문자 ★ 대신 그린 아이콘). 색은 부모의 text-* 를 따른다. */
export default function Stars({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <span
      className={`inline-flex gap-0.5 align-[-0.125em] ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-[1em] w-[1em]" fill="currentColor" focusable="false">
          <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" />
        </svg>
      ))}
    </span>
  );
}
