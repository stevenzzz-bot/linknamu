/** public/ 폴더에 파일이 있는지 (빌드 시점 기준, next.config.mjs 참고) */
const files = new Set((process.env.PUBLIC_FILES ?? "").split("\n").filter(Boolean));

export function hasPublicFile(src: string): boolean {
  return files.has(src.replace(/^\//, ""));
}
