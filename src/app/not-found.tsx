import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 pt-24 text-center">
      <h1 className="text-xl font-bold">페이지를 찾을 수 없습니다</h1>
      <Link href="/" className="mt-4 inline-block text-brand underline dark:text-brand-dark">
        홈으로
      </Link>
    </main>
  );
}
