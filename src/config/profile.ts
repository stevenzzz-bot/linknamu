/**
 * 프로필 & 링크 설정 — 이 파일을 수정해 내 링크로 바꾼다.
 * - id: 링크마다 고유. 클릭 수 집계 키이므로 바꾸면 집계가 새로 시작된다.
 * - url: http(s)만 허용 (빌드/요청 시 검증).
 */
export type LinkItem = {
  id: string;
  title: string;
  url: string;
  icon?: string;
};

export type Profile = {
  name: string;
  bio: string;
  avatar: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "홍길동",
  bio: "코드와 글을 만드는 개발자 · 프리랜서",
  avatar: "/avatar.svg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/", icon: "💻" },
    { id: "blog", title: "기술 블로그", url: "https://velog.io/", icon: "✍️" },
    { id: "instagram", title: "Instagram", url: "https://www.instagram.com/", icon: "📷" },
    { id: "youtube", title: "YouTube", url: "https://www.youtube.com/", icon: "▶️" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/", icon: "💼" },
  ],
};
