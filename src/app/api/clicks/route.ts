import { NextResponse } from "next/server";
import { links } from "@/lib/links";
import { getClickCounts } from "@/lib/clicks";

export const dynamic = "force-dynamic";

/** GET /api/clicks — { [linkId]: count } */
export async function GET() {
  const counts = await getClickCounts();
  const body = Object.fromEntries(links.map((l) => [l.id, counts[l.id] ?? 0]));
  return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
}
