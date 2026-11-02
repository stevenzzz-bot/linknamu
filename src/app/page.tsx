import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/config/profile";
import { getClickCounts } from "@/lib/clicks";
import { links } from "@/lib/links";
import { isMongoConfigured } from "@/lib/mongodb";

// 클릭 수가 매 요청마다 최신이어야 하므로 정적 생성하지 않는다.
export const dynamic = "force-dynamic";

export default async function Home() {
  const counts = await getClickCounts();
  const showClicks = isMongoConfigured();

  return (
    <>
      <ThemeToggle />
      <main className="mx-auto w-full max-w-xl px-4 pb-6 pt-14 sm:pt-20">
        <ProfileHeader name={profile.name} bio={profile.bio} avatar={profile.avatar} />
        <ul className="grid gap-3" aria-label="링크 목록">
          {links.map((link) => (
            <li key={link.id}>
              <LinkCard link={link} clicks={counts[link.id] ?? 0} showClicks={showClicks} />
            </li>
          ))}
        </ul>
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">🌳 링크나무</footer>
    </>
  );
}
