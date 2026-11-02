/**
 * 유입 경로(from) — 링크 주소 뒤에 ?from=insta 처럼 붙여 어디서 왔는지 구분한다.
 * 목록에 없는 값도 형식만 맞으면 그대로 집계된다(통계 화면에 코드 그대로 표시).
 */
export const SOURCE_LABELS: Record<string, string> = {
  insta: "인스타그램",
  threads: "스레드",
  youtube: "유튜브",
  kakao: "카톡 공유",
  card: "명함 QR",
  store: "매장 QR",
  box: "택배 박스 QR",
  site: "납품 현장 QR",
  direct: "직접·기타",
};

export function normalizeSource(value: string | null | undefined): string {
  const v = (value ?? "").trim().toLowerCase();
  return /^[a-z0-9_-]{1,20}$/.test(v) ? v : "direct";
}

/**
 * 사람이 아닌 방문(검색 로봇·링크 미리보기 수집기·스크립트)은 집계하지 않는다.
 * 카카오톡 인앱 브라우저(UA 에 KAKAOTALK)는 사람이므로 걸리지 않게 'kakaotalk-scrap' 만 막는다.
 */
const BOT_UA =
  /bot|crawl|spider|slurp|scrap|preview|facebookexternalhit|whatsapp|telegram|discord|headless|lighthouse|curl|wget|python|httpclient|axios|node-fetch/i;

export function isBot(userAgent: string | null): boolean {
  return !userAgent || BOT_UA.test(userAgent);
}
