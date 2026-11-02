# 🌳 링크나무

내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하는 Link in Bio 서비스.

**스택**: Next.js 14 (App Router) · TypeScript · Tailwind CSS · MongoDB Atlas · Vercel

## 기능

- **프로필** — 이름, 한 줄 소개, 프로필 사진
- **링크 카드** — SNS · 블로그 링크를 카드로 나열, 클릭 시 새 탭
- **다크모드** — 우측 상단 토글. 기본은 OS 설정, 선택은 브라우저에 저장 (첫 화면 깜빡임 없음)
- **클릭 수 집계** — 링크별 클릭 횟수를 MongoDB에 기록하고 카드에 표시
- **모바일 우선 반응형**

## 시작하기

```bash
cd linknamu
npm install
cp .env.example .env.local   # MONGODB_URI 채우기
npm run dev                  # http://localhost:3000
```

`MONGODB_URI` 가 없어도 페이지는 동작합니다 (클릭 수 표시·집계만 꺼짐).

## 내 링크로 바꾸기

`src/config/profile.ts` 를 수정합니다.

- `id` 는 링크마다 고유 — 클릭 수 집계 키라서 바꾸면 집계가 새로 시작됩니다.
- `url` 은 `http`/`https` 만 허용됩니다.
- 프로필 사진은 `public/` 에 넣고 `/파일명` 으로 지정합니다.

## 구조

```
src/
├── app/
│   ├── page.tsx            # 프로필 페이지 (매 요청 렌더, 최신 클릭 수)
│   ├── layout.tsx
│   ├── go/[id]/route.ts    # 클릭 +1 → 원래 URL로 302
│   └── api/clicks/route.ts # GET { [id]: count }
├── components/             # ProfileHeader, LinkCard, ThemeToggle, ThemeScript
├── config/profile.ts       # 프로필 & 링크 설정
└── lib/                    # mongodb 연결, clicks, links 검증
```

카드는 `/go/<id>` 를 거쳐 이동하므로 새 탭 열기 · 휠 클릭 · JS 비활성 상태에서도 클릭이 집계됩니다.
MongoDB `clicks` 컬렉션에 `{ _id: <linkId>, count, updatedAt }` 로 저장합니다.

## Vercel 배포

1. Vercel에서 이 저장소를 Import, **Root Directory** 를 `linknamu` 로 지정
2. Environment Variables 에 `MONGODB_URI`, `MONGODB_DB` 추가
3. MongoDB Atlas → Network Access 에서 Vercel 접속 허용 (`0.0.0.0/0` 또는 Vercel 통합)

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | 개발 서버 |
| `npm run build` / `npm start` | 프로덕션 빌드 / 실행 |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript 검사 |
