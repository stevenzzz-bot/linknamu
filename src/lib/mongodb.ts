import { MongoClient, type Db } from "mongodb";

/**
 * MongoDB Atlas 연결. 개발 모드 HMR / 서버리스 웜 인스턴스에서 연결을 재사용하도록
 * 전역에 promise를 캐시한다. MONGODB_URI 가 없으면 null — 클릭 집계 없이 페이지는 동작한다.
 */
const globalForMongo = globalThis as unknown as { _mongoClientPromise?: Promise<MongoClient> };

export async function getDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      globalForMongo._mongoClientPromise = undefined; // 다음 요청에서 재시도
      throw err;
    });
  }
  const client = await globalForMongo._mongoClientPromise;
  return client.db(process.env.MONGODB_DB || "linknamu");
}
