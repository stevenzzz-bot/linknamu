import { getDb } from "@/lib/mongodb";

type ClickDoc = { _id: string; count: number; updatedAt: Date };

const COLLECTION = "clicks";

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

/** 클릭 +1. 실패해도 리다이렉트는 진행되도록 예외를 삼키고 null 반환. */
export async function incrementClick(linkId: string): Promise<number | null> {
  try {
    const db = await getDb();
    if (!db) return null;
    const doc = await db
      .collection<ClickDoc>(COLLECTION)
      .findOneAndUpdate(
        { _id: linkId },
        { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
        { upsert: true, returnDocument: "after" },
      );
    return doc?.count ?? null;
  } catch (err) {
    console.error("[clicks] 증가 실패", err);
    return null;
  }
}
