import { NextResponse } from "next/server";
import { findLink } from "@/lib/links";
import { incrementClick } from "@/lib/clicks";

export const dynamic = "force-dynamic";

/**
 * GET /go/<id> — 클릭 수 +1 후 원래 URL로 302 리다이렉트.
 * 카드가 이 경로를 거치므로 새 탭 · 휠 클릭 · JS 비활성 상태에서도 집계된다.
 */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const link = findLink(params.id);
  if (!link) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  await incrementClick(link.id);
  return NextResponse.redirect(link.url, {
    status: 302,
    headers: { "Cache-Control": "no-store" },
  });
}
