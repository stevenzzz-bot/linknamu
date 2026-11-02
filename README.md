# 🌳 링크나무

내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하는 Link in Bio 서비스.

**스택**: Next.js 14 (App Router) · TypeScript · Tailwind CSS · MongoDB Atlas · Vercel

## 기능

- **히어로 이미지** — 제품 사진 + 모델명 라벨
- **프로필** — 로고, 이름, 한 줄 소개
- **숫자 3칸** — 보증 · 납품 실적 · 틸팅 각도
- **링크 카드** — SNS · 블로그 링크를 카드로 나열, 클릭 시 새 탭
- **납품 현장 · 고객 리뷰** — 사진 2장, 리뷰 카드 2개
- **하단** — 전화 상담 버튼, 이메일, 사업자 정보
- **클릭 수 집계** — 링크별 클릭 횟수를 MongoDB에 기록. 손님 화면에는 숨기고 사장님 전용 `/stats?key=…` 에서만 확인
- **모바일 우선 반응형**

## 시작하기

```bash
git clone https://github.com/stevenzzz-bot/linknamu && cd linknamu
npm install
cp .env.example .env.local   # MONGODB_URI 채우기
npm run dev                  # http://localhost:3000
```

`MONGODB_URI` 가 없어도 페이지는 동작합니다 (클릭 집계만 꺼짐).

## 내 링크로 바꾸기

`src/config/profile.ts` 를 수정합니다.

- `id` 는 링크마다 고유 — 클릭 수 집계 키라서 바꾸면 집계가 새로 시작됩니다.
- `url` 은 `http`/`https` 만 허용됩니다.
- 이미지(`logo.png`, `hero.jpg`, `install1.jpg`, `install2.jpg`)는 `public/` 에 넣습니다. 파일이 없으면 회색 박스에 파일명이 표시됩니다.
- 색은 `src/app/globals.css` 의 `:root` 변수(`--ink`, `--point` 등)에서 바꿉니다.

## 구조

```
src/
├── app/
│   ├── page.tsx            # 링크 페이지
│   ├── layout.tsx
│   ├── go/[id]/route.ts    # 클릭 +1 → 원래 URL로 302
│   └── stats/page.tsx      # 사장님 전용 클릭 통계 (/stats?key=STATS_KEY)
├── components/             # Hero, ProfileHeader, Stats, LinkCard, Installs, Reviews …
├── config/profile.ts       # 프로필 & 링크 설정
└── lib/                    # mongodb 연결, clicks, links 검증
```

카드는 `/go/<id>` 를 거쳐 이동하므로 새 탭 열기 · 휠 클릭 · JS 비활성 상태에서도 클릭이 집계됩니다.
MongoDB `clicks` 컬렉션에 `{ _id: <linkId>, count, updatedAt }` 로 저장합니다.

## Vercel 배포

1. Vercel에서 이 저장소를 Import (설정은 기본값 그대로)
2. Environment Variables 에 `MONGODB_URI`, `MONGODB_DB`, `STATS_KEY` 추가
3. MongoDB Atlas → Network Access 에서 Vercel 접속 허용 (`0.0.0.0/0` 또는 Vercel 통합)

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | 개발 서버 |
| `npm run build` / `npm start` | 프로덕션 빌드 / 실행 |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript 검사 |
