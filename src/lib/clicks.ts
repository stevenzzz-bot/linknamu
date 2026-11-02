import { getDb } from "@/lib/mongodb";

type ClickDoc = { _id: string; count: number; updatedAt: Date; bySource?: Record<string, number> };
type VisitDoc = { _id: string; count: number; updatedAt: Date };

const COLLECTION = "clicks";
const VISITS = "visits";

/** 링크별 클릭 수. DB 미설정/장애 시 빈 객체 (페이지 렌더는 막지 않는다). */
export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const db = await getDb();
    if (!db) return {};
    const docs = await db.collection<ClickDoc>(COLLECTION).find({}).toArray();
    return Object.fromEntries(docs.map((d) => [d._id, d.count]));
  } catch (err) {
    console.error("[clicks] 조회 실패", err);
    return {};
  }
}

export type ClickStat = { id: string; count: number; updatedAt: Date | null; bySource: Record<string, number> };

/** 통계 페이지용: 링크별 클릭 수 + 마지막 클릭 시각. DB 미설정이면 null. */
export async function getClickStats(): Promise<ClickStat[] | null> {
  const db = await getDb();
  if (!db) return null;
  const docs = await db.collection<ClickDoc>(COLLECTION).find({}).toArray();
  return docs.map((d) => ({ id: d._id, count: d.count, updatedAt: d.updatedAt ?? null, bySource: d.bySource ?? {} }));
}

/** 클릭 +1. 실패해도 리다이렉트는 진행되도록 예외를 삼키고 null 반환. */
export async function incrementClick(linkId: string, source = "direct"): Promise<number | null> {
  try {
    const db = await getDb();
    if (!db) return null;
    const doc = await db
      .collection<ClickDoc>(COLLECTION)
      .findOneAndUpdate(
        { _id: linkId },
        { $inc: { count: 1, [`bySource.${source}`]: 1 }, $set: { updatedAt: new Date() } },
        { upsert: true, returnDocument: "after" },
      );
    return doc?.count ?? null;
  } catch (err) {
    console.error("[clicks] 증가 실패", err);
    return null;
  }
}

/** 방문 +1 (유입 경로별). 브라우저 세션당 1회만 호출된다 — SourceTracker 참고. */
export async function recordVisit(source: string): Promise<void> {
  try {
    const db = await getDb();
    if (!db) return;
    await db
      .collection<VisitDoc>(VISITS)
      .updateOne({ _id: source }, { $inc: { count: 1 }, $set: { updatedAt: new Date() } }, { upsert: true });
  } catch (err) {
    console.error("[visits] 기록 실패", err);
  }
}

/** 유입 경로별 방문 수. DB 미설정이면 null. */
export async function getVisitStats(): Promise<Record<string, number> | null> {
  const db = await getDb();
  if (!db) return null;
  const docs = await db.collection<VisitDoc>(VISITS).find({}).toArray();
  return Object.fromEntries(docs.map((d) => [d._id, d.count]));
}
