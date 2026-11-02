import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[480px] px-4 pt-24 text-center">
      <h1 className="text-xl font-bold">페이지를 찾을 수 없습니다</h1>
      <Link href="/" className="mt-4 inline-block text-muted underline underline-offset-4">
        홈으로
      </Link>
    </main>
  );
}
