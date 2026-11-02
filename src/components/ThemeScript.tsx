/**
 * 첫 페인트 전에 <html>에 dark 클래스를 적용해 테마 깜빡임을 막는다.
 * 저장된 선택이 없으면 OS 설정(prefers-color-scheme)을 따른다.
 */
export const THEME_STORAGE_KEY = "linknamu-theme";

const script = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
