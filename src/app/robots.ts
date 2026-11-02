import type { MetadataRoute } from "next";
import { profile } from "@/config/profile";

/** 검색 로봇: 링크 페이지는 허용, 클릭 집계 경로와 통계·API 는 수집 금지 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/go/", "/stats", "/api/"] },
    sitemap: `${profile.siteUrl}/sitemap.xml`,
  };
}
