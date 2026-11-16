import ActionList from "@/components/ActionList";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Installs from "@/components/Installs";
import OfferCard from "@/components/OfferCard";
import ProfileHeader from "@/components/ProfileHeader";
import Reviews from "@/components/Reviews";
import SiteFooter from "@/components/SiteFooter";
import SocialLinks from "@/components/SocialLinks";
import SourceTracker from "@/components/SourceTracker";
import { profile } from "@/config/profile";
import { links, socials } from "@/lib/links";

export default function Home() {
  const offer = links.find((l) => l.featured && l.offer);
  const kakao = links.find((l) => l.id === "kakao");
  const rows = links.filter((l) => l !== offer && l !== kakao && l.placement !== "hidden");
  const videoLink = links.find((l) => l.id === "assembly-video");

  return (
    <>
      <main className="mx-auto w-full max-w-[480px] px-5 pt-4 sm:pt-10">
        <Hero hero={profile.hero} />
        <ProfileHeader name={profile.name} bio={profile.bio} logo={profile.logo} stats={profile.stats} />
        {offer?.offer && (
          <div className="rise mt-7" style={{ "--i": 3 } as React.CSSProperties}>
            <OfferCard link={{ ...offer, offer: offer.offer }} />
          </div>
        )}
        <ActionList kakao={kakao} rows={rows} video={profile.video} videoLink={videoLink} />
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
