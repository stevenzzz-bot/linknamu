import { readdirSync } from "node:fs";

/**
 * public/ 에 실제로 있는 파일 목록을 빌드 시점에 고정한다.
 * 이미지가 없으면 화면에 회색 자리표시를 그리기 위해 쓴다 (src/lib/assets.ts).
 */
const publicFiles = readdirSync(new URL("./public", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: { PUBLIC_FILES: publicFiles.join("\n") },
};

export default nextConfig;
