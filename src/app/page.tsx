import Hero from "@/components/Hero";
import Installs from "@/components/Installs";
import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import Reviews from "@/components/Reviews";
import SiteFooter from "@/components/SiteFooter";
import SocialLinks from "@/components/SocialLinks";
import Stats from "@/components/Stats";
import { profile } from "@/config/profile";
import { getClickCounts } from "@/lib/clicks";
import { links, socials } from "@/lib/links";
import { isMongoConfigured } from "@/lib/mongodb";

// 클릭 수가 매 요청마다 최신이어야 하므로 정적 생성하지 않는다.
export const dynamic = "force-dynamic";

export default async function Home() {
  const counts = await getClickCounts();
  const showClicks = isMongoConfigured();

  return (
    <>
      <main className="mx-auto w-full max-w-[480px] px-4 pt-4 sm:pt-10">
        <Hero hero={profile.hero} />
        <ProfileHeader name={profile.name} bio={profile.bio} logo={profile.logo} />
        <Stats stats={profile.stats} />
        <ul className="mt-6 grid gap-2.5" aria-label="링크 목록">
          {links.map((link) => (
            <li key={link.id}>
              <LinkCard link={link} clicks={counts[link.id] ?? 0} showClicks={showClicks} />
            </li>
          ))}
        </ul>
        <Installs installs={profile.installs} />
        <Reviews reviews={profile.reviews} />
        <SocialLinks socials={socials} />
      </main>
      <SiteFooter contact={profile.contact} business={profile.business} />
    </>
  );
}
