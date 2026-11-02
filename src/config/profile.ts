/**
 * 프로필 & 링크 설정 — 이 파일을 수정해 내 링크로 바꾼다.
 * - id: 링크마다 고유(links·socials 전체에서). 클릭 수 집계 키이므로 바꾸면 집계가 새로 시작된다.
 * - url: http(s)만 허용 (빌드/요청 시 검증).
 * - icon: src/components/Icon.tsx 에 정의된 이름.
 */
import type { IconName } from "@/components/Icon";

export type LinkItem = {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon: IconName;
  /** true 면 강조 카드(--accent 배경 + 흰 글씨) */
  featured?: boolean;
};

export type SocialItem = {
  id: string;
  label: string;
  url: string;
  icon: IconName;
};

export type Profile = {
  name: string;
  bio: string;
  avatar: string;
  links: LinkItem[];
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
  bio: "하이백 의자 · 학원·사무실 의자",
  avatar: "/avatar.svg",
  links: [
    {
      id: "highback",
      title: "하이백 의자 보러 가기",
      description: "리뷰 52개, 5년 보증",
      url: "https://smartstore.naver.com/kickrider/products/13684736019",
      icon: "chair",
      featured: true,
    },
    {
      id: "kakao",
      title: "카톡으로 바로 상담",
      description: "높이·사이즈 궁금한 점 물어보기",
      url: "http://pf.kakao.com/_Dggbn",
      icon: "chat",
    },
    {
      id: "bulk-quote",
      title: "학원·사무실 대량 견적",
      description: "10대부터, 견적서 1영업일 안에",
      url: "https://mychairkr.netlify.app",
      icon: "quote",
    },
    {
      id: "all-products",
      title: "전체 상품 보기",
      description: "하이백 · 미들백",
      url: "https://smartstore.naver.com/kickrider",
      icon: "grid",
    },
    {
      id: "visit",
      title: "수원에서 직접 앉아보기",
      description: "방문 전 연락 주시면 안내드려요",
      url: `https://map.naver.com/p/search/${encodeURIComponent(STORE_ADDRESS)}`,
      icon: "pin",
    },
    // TODO: 유튜브 조립영상 주소가 정해지면 주석을 풀고 url 을 채운다.
    // {
    //   id: "assembly-video",
    //   title: "조립 영상 보기",
    //   description: "혼자서 15분이면 끝나요",
    //   url: "https://www.youtube.com/...",
    //   icon: "play",
    // },
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
