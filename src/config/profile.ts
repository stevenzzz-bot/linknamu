/**
 * 프로필 & 링크 설정 — 이 파일을 수정해 내 링크로 바꾼다.
 * - id: 링크마다 고유(links·socials 전체에서). 클릭 수 집계 키이므로 바꾸면 집계가 새로 시작된다.
 * - url: http(s)만 허용 (빌드/요청 시 검증).
 * - SNS icon: src/components/Icon.tsx 에 정의된 이름.
 */
import type { IconName } from "@/components/Icon";

export type LinkItem = {
  id: string;
  title: string;
  description?: string;
  url: string;
  /** true 면 강조 카드(--ink 배경 + 흰 글씨) */
  featured?: boolean;
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
  name: string;
  bio: string;
  logo: string;
  hero: Img & { label: string };
  stats: { value: string; label: string }[];
  links: LinkItem[];
  installs: { images: Img[]; caption: string };
  reviews: { tag: string; text: string; author: string; source: string }[];
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
  name: "나의자랑",
  bio: "오래 앉는 사람을 위한 메쉬 의자",
  logo: "/logo.png",
  hero: { src: "/hero.jpg", alt: "책상 앞에 놓인 하이백 메쉬 의자", label: "NAJ-H01 하이백" },
  stats: [
    { value: "5년", label: "무상 보증" },
    { value: "100대", label: "학원 단일 납품" },
    { value: "125°", label: "자유 틸팅" },
  ],
  links: [
    {
      id: "highback",
      title: "하이백 의자 보러 가기",
      description: "리뷰 52개, 5년 보증",
      url: "https://smartstore.naver.com/kickrider/products/13684736019",
      featured: true,
    },
    {
      id: "kakao",
      title: "카톡으로 바로 상담",
      description: "높이·사이즈 궁금한 점 물어보기",
      url: "http://pf.kakao.com/_Dggbn",
    },
    {
      id: "bulk-quote",
      title: "학원·사무실 대량 견적",
      description: "10대부터, 견적서 1영업일 안에",
      url: "https://mychairkr.netlify.app",
    },
    {
      id: "all-products",
      title: "전체 상품 보기",
      description: "하이백 · 미들백",
      url: "https://smartstore.naver.com/kickrider",
    },
    {
      id: "visit",
      title: "수원에서 직접 앉아보기",
      description: "방문 전 연락 주시면 안내드려요",
      url: `https://map.naver.com/p/search/${encodeURIComponent(STORE_ADDRESS)}`,
    },
    // TODO: 유튜브 조립영상 주소가 정해지면 주석을 풀고 url 을 채운다.
    // {
    //   id: "assembly-video",
    //   title: "조립 영상 보기",
    //   description: "혼자서 15분이면 끝나요",
    //   url: "https://www.youtube.com/...",
    // },
  ],
  installs: {
    images: [
      { src: "/install1.jpg", alt: "메쉬 의자가 줄지어 놓인 교육시설 강의실" },
      { src: "/install2.jpg", alt: "의자 박스를 가득 실은 납품 트럭" },
    ],
    caption: "서울 신림 교육시설 · 미들백 100대",
  },
  reviews: [
    {
      tag: "편안함",
      text: "헤드레스트도 조절이 되서 머리와 목을 잘 받쳐주어서 편하구요, 허리도 곡선으로 밀착됩니다. 팔 높이도 조절돼서 자세에 따라 조절해서 앉으니 편합니다.",
      author: "bban님",
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
