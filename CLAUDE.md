# 링크나무 (Link in Bio 서비스)

Linktree처럼 내 모든 링크를 한 페이지에 모아두고 하나의 URL로 공유하는 서비스.

## 기술 스택
- Next.js 14 (App Router), Tailwind CSS, MongoDB Atlas (클릭 수 저장), Vercel (배포)

## 코드 규칙
- TypeScript 사용
- 컴포넌트는 `src/components/` 아래에 작성
- 환경 변수는 `.env.local`에 저장 (절대 커밋하지 않음) — 키 목록은 `.env.example`
- 모바일 우선 반응형 디자인 (Tailwind 기본 클래스 = 모바일, `sm:` 이상으로 확장)

## 확인 명령
`npm run typecheck && npm run lint && npm run build`
