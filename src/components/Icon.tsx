/**
 * 인라인 SVG 아이콘 — 단색(currentColor), 선 굵기 1.75.
 * 새 아이콘은 24x24 viewBox 기준 path 를 ICONS 에 추가한다.
 */
const ICONS = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  threads: (
    <>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M15.5 12v1.5a2.5 2.5 0 0 0 5 0V12a8.5 8.5 0 1 0-3.4 6.8" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  headrest: (
    <>
      <rect x="6.5" y="2.5" width="11" height="5" rx="2.5" />
      <path d="M12 7.5v3M7.5 10.5h9a1.5 1.5 0 0 1 1.5 1.5v8.5H6V12a1.5 1.5 0 0 1 1.5-1.5z" />
    </>
  ),
  lumbar: (
    <>
      <path d="M9 2.5c4 3.5 4 7.5 0 9.5s-4 6.5 0 9.5" />
      <path d="M16.5 9l-3 3 3 3" />
    </>
  ),
  armrest: (
    <>
      <rect x="2.5" y="11" width="11" height="3.5" rx="1.75" />
      <path d="M8 14.5v6M18.5 5v14M16 7.5 18.5 5 21 7.5M16 16.5l2.5 2.5 2.5-2.5" />
    </>
  ),
  seat: (
    <>
      <rect x="4" y="8" width="16" height="9" rx="4.5" />
      <path d="M2 12.5h2M20 12.5h2M9 17v3.5M15 17v3.5" />
    </>
  ),
} as const;

export type IconName = keyof typeof ICONS;

export default function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {ICONS[name]}
    </svg>
  );
}
