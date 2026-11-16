/**
 * 링크 카드 왼쪽의 서비스 마크 (40px 정사각, 모서리 10px).
 * 페이지 톤(베이지·잉크)을 지키기 위해 잉크 단색 라인 아이콘으로 통일하고,
 * 가장 중요한 상담 채널인 카카오톡만 공식 노란색을 남긴다.
 */
export type BrandMarkName = "kakao" | "naver" | "naver-map" | "youtube" | "quote";

const LINE = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const MARKS: Record<BrandMarkName, { color?: string; svg: React.ReactNode }> = {
  kakao: {
    color: "#FEE500",
    svg: (
      <path
        transform="translate(12 12) scale(1.3) translate(-12 -12)"
        fill="#191919"
        d="M12 5.2c-4.3 0-7.8 2.7-7.8 6.1 0 2.2 1.5 4.1 3.7 5.2l-.8 2.9c-.1.3.3.5.5.3l3.4-2.3c.3 0 .7.1 1 .1 4.3 0 7.8-2.7 7.8-6.1S16.3 5.2 12 5.2z"
      />
    ),
  },
  // 스마트스토어: 쇼핑백
  naver: {
    svg: (
      <g {...LINE}>
        <path d="M5.5 8h13l-1 11.5a1.5 1.5 0 0 1-1.5 1.4H8a1.5 1.5 0 0 1-1.5-1.4z" />
        <path d="M9 10V7a3 3 0 0 1 6 0v3" />
      </g>
    ),
  },
  // 지도: 위치 핀
  "naver-map": {
    svg: (
      <g {...LINE}>
        <path d="M12 21s-6.5-5.8-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.2 12 21 12 21z" />
        <circle cx="12" cy="10.5" r="2.3" />
      </g>
    ),
  },
  // 영상: 재생 버튼
  youtube: {
    svg: (
      <g {...LINE}>
        <rect x="3" y="5.5" width="18" height="13" rx="3.5" />
        <path d="M10.3 9.4v5.2l4.4-2.6z" />
      </g>
    ),
  },
  // 견적서: 문서
  quote: {
    svg: (
      <g {...LINE}>
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
      className={`grid h-10 w-10 flex-none place-items-center rounded-[10px] border ${
        m.color ? "border-black/5" : "border-line bg-bg text-ink"
      }`}
      style={m.color ? { background: m.color } : undefined}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" focusable="false">
        {m.svg}
      </svg>
    </span>
  );
}
