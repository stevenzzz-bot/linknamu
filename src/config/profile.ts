/**
 * 프로필 & 링크 설정 — 이 파일을 수정해 내 링크로 바꾼다.
 * - id: 링크마다 고유(links·socials 전체에서). 클릭 수 집계 키이므로 바꾸면 집계가 새로 시작된다.
 * - url: http(s)만 허용 (빌드/요청 시 검증).
 * - SNS icon: src/components/Icon.tsx 에 정의된 이름.
 */
import type { BrandMarkName } from "@/components/BrandMark";
import type { IconName } from "@/components/Icon";

export type LinkItem = {
  id: string;
  title: string;
  description?: string;
  url: string;
  /** true 면 강조 카드(--ink 배경 + 흰 글씨) */
  featured?: boolean;
  /** 카드 왼쪽 서비스 로고 */
  mark?: BrandMarkName;
  /** 대표 상품 카드(할인가·혜택·구매 버튼). 있으면 featured 카드가 이 모양으로 그려진다 */
  offer?: {
    name: string;
    was: string;
    discount: string;
    now: string;
    /** 가격 바로 옆에 붙는 배송 문구 (예: 무료배송) */
    shipping?: string;
    /** 당일 출고 타이머 아래 도착 통계 문구 (사장님 제공 통계) */
    arrival?: string;
    /** 리뷰·구매 적립을 뺀 체감가 (조건부라 작게 표시) */
    effective?: string;
    perks: string[];
    cta: string;
  };
  /** 설명 안에서 포인트색으로 강조할 부분 (가격) */
  highlight?: string;
  /** "card" = 큰 카드(기본), "grid" = 아래 3열 아이콘 버튼, "hidden" = 화면에는 없고 다른 곳에서 /go 로만 사용 */
  placement?: "card" | "grid" | "hidden";
  /** 3열 버튼에 쓰는 짧은 이름 */
  short?: string;
  /** 있으면 설명 앞에 ★★★★★ 표시 (--point 색) */
  showStars?: boolean;
};

/** public/ 기준 경로. 파일이 없으면 회색 자리표시가 나온다. */
type Img = { src: string; alt: string };

export type SocialItem = {
  id: string;
  label: string;
  url: string;
  icon: IconName;
};

export type Profile = {
  /** 실제 사이트 주소 — 공유 미리보기(OG) 이미지 경로의 기준 */
  siteUrl: string;
  name: string;
  bio: string;
  logo: string;
  hero: Img & { label: string };
  stats: { value: string; label: string }[];
  links: LinkItem[];
  installs: { images: Img[]; caption: string };
  reviews: { tag: string; text: string; author: string; source: string }[];
  /** 세로 홍보 영상 (public/ 기준). 없으면 섹션이 숨겨진다 */
  video?: { src: string; poster: string; label: string };
  /** "앉아보면 다른 점" — 구매자 리뷰에 실제로 나온 특징만 적는다 */
  features: { icon: "headrest" | "lumbar" | "armrest" | "seat"; title: string; desc: string }[];
  /** 구매자 사진 리뷰 — 스마트스토어 포토리뷰의 사진과 문장(원문 그대로, 일부 발췌) */
  photoReviews: { src: string; text: string; meta: string }[];
  /** 스마트스토어 리뷰 키워드 (스토어 리뷰 화면의 태그 그대로) */
  reviewTags: string[];
  /** 자주 묻는 질문 — 비어 있으면 섹션이 숨겨진다 */
  faq: { q: string; a: string }[];
  socials: SocialItem[];
  contact: {
    phone: string; // tel: 링크용 숫자
    phoneLabel: string; // 화면 표시용
    hours: string;
    email: string;
  };
  business: {
    name: string;
    owner: string;
    registrationNo: string;
    address: string;
  };
};

const STORE_ADDRESS = "경기도 수원시 팔달구 세지로 420";

export const profile: Profile = {
  siteUrl: "https://mychairkr.vercel.app",
  name: "나의자랑",
  bio: "오래 앉는 사람을 위한 메쉬 의자",
  logo: "/logo.png",
  hero: { src: "/hero-wide.jpg", alt: "독서실 통로에 마주 놓인 하이백 메쉬 의자 두 개", label: "NAJ-H01 하이백" },
  // 프로필 아래 한 줄 요약 ("100대 납품"은 아래 납품 현장 영역에서 보여준다)
  stats: [
    { value: "5년", label: "무상 보증" },
    { value: "125°", label: "자유 틸팅" },
  ],
  links: [
    {
      id: "highback",
      title: "하이백 의자 보러 가기",
      // 가격은 스마트스토어 즉시할인가 기준(포인트 적립 제외). 스토어 가격이 바뀌면 같이 고친다.
      description: "별점 4.9 · 78,800원 무료배송",
      highlight: "78,800원",
      // 스마트스토어 상품 화면 기준: 정상가 155,000원, 즉시할인 49%(-76,200원) → 판매가 78,800원, 배송비 무료
      // 리뷰·구매 적립 최대 5,788원 → 체감가 73,012원 (리뷰 작성 조건 충족 시)
      offer: {
        name: "NAJ-H01 하이백 메쉬 의자",
        was: "155,000원",
        discount: "49%",
        now: "78,800원",
        shipping: "무료배송",
        effective: "73,012원",
        arrival: "다음 날 도착 98%",
        perks: ["5년 무상 A/S", "수원 매장 시착"],
        cta: "스마트스토어에서 구매하기",
      },
      showStars: true,
      url: "https://smartstore.naver.com/kickrider/products/13684736019",
      featured: true,
    },
    {
      id: "kakao",
      mark: "kakao",
      title: "카톡으로 바로 상담",
      description: "높이·사이즈 궁금한 점 물어보기",
      url: "http://pf.kakao.com/_Dggbn",
    },
    {
      id: "bulk-quote",
      mark: "quote",
      placement: "grid",
      short: "대량 견적",
      title: "학원·사무실 대량 견적",
      description: "10대부터, 견적서 1영업일 안에",
      url: "https://mychairkr.netlify.app",
    },
    {
      id: "all-products",
      mark: "naver",
      title: "전체 상품 보기",
      // 하이백 가격은 첫 카드에만. 미들백은 상품 47,000원 + 배송비 6,000원 = 53,000원
      description: "하이백 · 미들백\u00a053,000원 (배송비\u00a0포함)",
      url: "https://smartstore.naver.com/kickrider",
    },
    {
      id: "visit",
      mark: "naver-map",
      placement: "grid",
      short: "매장 방문",
      title: "수원에서 직접 앉아보기",
      description: "방문 전 연락 주시면 안내드려요",
      url: `https://map.naver.com/p/search/${encodeURIComponent(STORE_ADDRESS)}`,
    },
    {
      id: "assembly-video",
      mark: "youtube",
      // 3열의 "영상 보기"를 펼치면 나오는 링크로만 쓴다
      placement: "hidden",
      title: "조립 영상 보기",
      description: "혼자서 15분이면 끝나요",
      url: "https://www.youtube.com/@mychairkr",
    },
  ],
  video: {
    src: "/promo.mp4",
    poster: "/promo-poster.jpg",
    label: "나의자랑 하이백 메쉬 의자 15초 소개 영상",
  },
  installs: {
    images: [
      { src: "/install1.jpg", alt: "메쉬 의자가 줄지어 놓인 교육시설 강의실" },
      { src: "/install2.jpg", alt: "의자 박스를 가득 실은 납품 트럭" },
    ],
    caption: "서울 신림 교육시설 · 미들백 100대",
  },
  reviews: [
    {
      tag: "5년 A/S",
      text: "원룸 자취방 옵션 의자가 불편해서 새로 사려고 이것저것 찾아보다가 스레드에서 사장님 글 보고 가격도 괜찮고 기능들도 괜찮으니 믿어보자~ 하며 샀는데 마음에 듭니다 5년까지 AS 되는 것도 좋고 엉덩이 부분이 넓직해서 더 편안한것 같아요",
      author: "170cm 구매자님",
      source: "스마트스토어 구매 리뷰",
    },
    // TODO: 리뷰 전문을 받으면 주석을 풀고 text 를 채운다. (지금은 뒷부분이 잘려 있음)
    // {
    //   tag: "품질",
    //   text: "마감처리도 깔끔하게 잘 나왔고, 구석구석 훑어봐도 …",
    //   author: "devi님",
    //   source: "스마트스토어 구매 리뷰",
    // },
    {
      tag: "재구매",
      text: "남편이 하나 사다달라그래서 하나 더 구매하려고요",
      author: "ziod님",
      source: "스마트스토어 구매 리뷰",
    },
  ],
  features: [
    { icon: "headrest", title: "헤드레스트 조절", desc: "머리와 목을 받쳐줘요" },
    { icon: "lumbar", title: "허리 곡선 등판", desc: "허리에 곡선으로 밀착돼요" },
    { icon: "armrest", title: "팔걸이 높이 조절", desc: "자세에 맞춰 바꿔 앉아요" },
    { icon: "seat", title: "넓직한 좌판", desc: "엉덩이가 편안해요" },
  ],
  photoReviews: [
    {
      src: "/reviews/r1.jpg",
      text: "서재용으로 샀는데 너무 편하다더니 딸아이한테 뺏겼어요.. 헤드레스트랑 등받이 메쉬 감싸주는 게 대박입니다.",
      meta: "164cm · 스마트스토어 구매",
    },
    {
      src: "/reviews/r2.jpg",
      text: "만원더주고 그레이색상을 했는데, 흰색 책상과 잘 어울립니다. 헤드 레스트도 조절이되서 머리와 목을 잘 받쳐주어서 편하구요",
      meta: "bban님 · 클라우드 그레이",
    },
    {
      src: "/reviews/r3.jpg",
      text: "평소에 오래 앉아서 작업할 일이 많아 허리가 왕왕 뻐근했는데, 이 의자로 바꾸고 나서 피로도가 아예 없네요?!!",
      meta: "160cm · 스마트스토어 구매",
    },
    {
      src: "/reviews/r4.jpg",
      text: "쿠션감은 너무 푹신하지 않고 오래 앉아있을 때 엉덩이 안아픈 정도로 딱 좋아요.",
      meta: "170cm · 스마트스토어 구매",
    },
    {
      src: "/reviews/r5.jpg",
      text: "의자가 생각보다 무거운데 그만큼 단단하니 좋네요! 조립법도 상세히 설명해주셔서 잘 따라서 할 수 있었네요",
      meta: "스마트스토어 구매",
    },
  ],
  reviewTags: ["편해요", "허리가 편해요", "쿠션감이 좋아요", "튼튼해요", "마감이 좋아요", "몸을 잘 받쳐줘요"],
  // TODO: 사장님 답변을 받으면 채운다 (의자 크기·높이 범위 / 배송 기간 / A/S 방법)
  faq: [],
  socials: [
    { id: "instagram", label: "인스타그램", url: "https://www.instagram.com/mychair.kr", icon: "instagram" },
    { id: "threads", label: "스레드", url: "https://www.threads.net/@mychair.kr", icon: "threads" },
  ],
  contact: {
    phone: "01082846202",
    phoneLabel: "010-8284-6202",
    hours: "평일 10:00–18:00",
    email: "stevenzzz@naver.com",
  },
  business: {
    name: "나의자랑",
    owner: "정재창",
    registrationNo: "337-29-00811",
    address: `${STORE_ADDRESS}, 403호`,
  },
};
