import { NextResponse } from "next/server";
import { findLink } from "@/lib/links";
import { incrementClick } from "@/lib/clicks";
import { isBot, normalizeSource } from "@/lib/source";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

/** 네이버 앱 안에서 열어야 로그인된 상태로 바로 구매할 수 있는 주소 */
function opensInNaverApp(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return hostname === "smartstore.naver.com" || hostname === "m.smartstore.naver.com";
  } catch {
    return false;
  }
}

/** 네이버 앱 인앱브라우저로 여는 앱 주소 (설치돼 있지 않으면 웹으로 대체) */
const naverScheme = (url: string) =>
  `naversearchapp://inappbrowser?url=${encodeURIComponent(url)}&target=new&version=6`;

const androidIntent = (url: string) =>
  `intent://inappbrowser?url=${encodeURIComponent(url)}&target=new&version=6` +
  `#Intent;scheme=naversearchapp;package=com.nhn.android.search;S.browser_fallback_url=${encodeURIComponent(url)};end`;

/** iOS: 앱을 먼저 시도하고, 앱이 안 열리면(설치 안 됨) 1.5초 뒤 웹으로 */
function iosPage(url: string): Response {
  const app = JSON.stringify(naverScheme(url));
  const web = JSON.stringify(url);
  const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>네이버 앱으로 이동 중</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f5f3f0;color:#2b2b2b;font:16px/1.5 -apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo",sans-serif;text-align:center}
a{display:inline-block;margin-top:14px;padding:12px 20px;border-radius:12px;background:#2b2b2b;color:#fff;text-decoration:none;font-weight:700}</style></head>
<body><div><p>네이버 앱으로 이동하고 있어요</p><a href=${web}>웹에서 열기</a></div>
<script>
var web=${web};
var t=setTimeout(function(){ if(!document.hidden) location.replace(web); },1500);
document.addEventListener("visibilitychange",function(){ if(document.hidden) clearTimeout(t); });
location.href=${app};
</script></body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", ...NO_STORE } });
}

/**
 * GET /go/<id> — 클릭 수 +1 후 원래 주소로 이동.
 * ?from=<유입경로> 가 붙어 오면 경로별로도 센다. 검색 로봇 등은 세지 않는다.
 * 스마트스토어 주소는 휴대폰에서 네이버 앱으로 바로 연다(로그인된 상태로 구매).
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const link = findLink(params.id);
  if (!link) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const ua = req.headers.get("user-agent") ?? "";
  if (!isBot(ua)) {
    await incrementClick(link.id, normalizeSource(new URL(req.url).searchParams.get("from")));
  }

  // 이미 네이버 앱 안이면 그대로 이동
  const inNaverApp = /NAVER\(inapp/i.test(ua);
  if (opensInNaverApp(link.url) && !inNaverApp && !isBot(ua)) {
    if (/Android/i.test(ua)) {
      return new Response(null, { status: 302, headers: { Location: androidIntent(link.url), ...NO_STORE } });
    }
    if (/iPhone|iPad|iPod/i.test(ua)) return iosPage(link.url);
  }

  return NextResponse.redirect(link.url, { status: 302, headers: NO_STORE });
}
