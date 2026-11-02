/**
 * 링크 카드 왼쪽의 서비스 로고 (40px 정사각, 모서리 10px).
 * 공식 색을 쓴 단순화한 마크 — 이미지 파일 없이 인라인 SVG.
 */
export type BrandMarkName = "kakao" | "naver" | "naver-map" | "youtube" | "quote";

const MARKS: Record<BrandMarkName, { label: string; bg: string; svg: React.ReactNode }> = {
  kakao: {
    label: "카카오톡",
    bg: "#FEE500",
    svg: (
      <path
        transform="translate(12 12) scale(1.3) translate(-12 -12)"
        fill="#191919"
        d="M12 5.2c-4.3 0-7.8 2.7-7.8 6.1 0 2.2 1.5 4.1 3.7 5.2l-.8 2.9c-.1.3.3.5.5.3l3.4-2.3c.3 0 .7.1 1 .1 4.3 0 7.8-2.7 7.8-6.1S16.3 5.2 12 5.2z"
      />
    ),
  },
  naver: {
    label: "네이버 스마트스토어",
    bg: "#03C75A",
    svg: <path fill="#fff" d="M7 6.5h3.4l3.4 5V6.5H17v11h-3.4l-3.4-5v5H7z" />,
  },
  "naver-map": {
    label: "네이버 지도",
    bg: "#03C75A",
    svg: (
      <>
        <path fill="#fff" d="M12 4.5a5.5 5.5 0 0 0-5.5 5.5c0 4 5.5 9.5 5.5 9.5s5.5-5.5 5.5-9.5A5.5 5.5 0 0 0 12 4.5z" />
        <circle cx="12" cy="10" r="2" fill="#03C75A" />
      </>
    ),
  },
  youtube: {
    label: "유튜브",
    bg: "#FF0000",
    svg: <path fill="#fff" d="M9 7.2v9.6l8.2-4.8z" />,
  },
  quote: {
    label: "견적",
    bg: "var(--bg)",
    svg: (
      <g fill="none" stroke="var(--ink)" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8z" />
        <path d="M14 4v4h4M9.5 13h5M9.5 16.5h3" />
      </g>
    ),
  },
};

export default function BrandMark({ name }: { name: BrandMarkName }) {
  const m = MARKS[name];
  return (
    <span
      className="grid h-10 w-10 flex-none place-items-center rounded-[10px] border border-black/5"
      style={{ background: m.bg }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" focusable="false">
        {m.svg}
      </svg>
    </span>
  );
}
