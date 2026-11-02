import { recordVisit } from "@/lib/clicks";
import { isBot, normalizeSource } from "@/lib/source";

export const dynamic = "force-dynamic";

/** POST /api/visit — 본문: 유입 경로 문자열. 방문 수 +1 (로봇 제외). */
export async function POST(req: Request) {
  if (!isBot(req.headers.get("user-agent"))) {
    const body = (await req.text()).slice(0, 40);
    await recordVisit(normalizeSource(body));
  }
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
