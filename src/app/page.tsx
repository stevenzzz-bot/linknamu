import Hero from "@/components/Hero";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Installs from "@/components/Installs";
import LinkCard from "@/components/LinkCard";
import LinkGrid from "@/components/LinkGrid";
import ProfileHeader from "@/components/ProfileHeader";
import Reviews from "@/components/Reviews";
import SiteFooter from "@/components/SiteFooter";
import SocialLinks from "@/components/SocialLinks";
import SourceTracker from "@/components/SourceTracker";
import { profile } from "@/config/profile";
import { links, socials } from "@/lib/links";

export default function Home() {
  const cards = links.filter((l) => (l.placement ?? "card") === "card");
  const grid = links.filter((l) => l.placement === "grid");
  return (
    <>
      <main className="mx-auto w-full max-w-[480px] px-4 pt-4 sm:pt-10">
        <Hero hero={profile.hero} />
        <ProfileHeader name={profile.name} bio={profile.bio} logo={profile.logo} stats={profile.stats} />
        <ul className="mt-6 grid gap-2.5" aria-label="링크 목록">
          {cards.map((link, i) => (
            <li key={link.id} className="rise" style={{ "--i": 3 + i } as React.CSSProperties}>
              <LinkCard link={link} />
            </li>
          ))}
        </ul>
        <LinkGrid links={grid} video={profile.video} videoLink={links.find((l) => l.id === "assembly-video")} />
        <Features features={profile.features} />
        <Reviews reviews={profile.reviews} tags={profile.reviewTags} />
        <Installs installs={profile.installs} />
        <Faq faq={profile.faq} />
        <SocialLinks socials={socials} />
      </main>
      <SiteFooter contact={profile.contact} business={profile.business} />
      <SourceTracker />
    </>
  );
}
