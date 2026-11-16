import SectionTitle from "@/components/SectionTitle";
import type { Profile } from "@/config/profile";

/**
 * 세로 홍보 영상. 첫 화면을 가볍게 두기 위해 링크 카드 아래에 두고,
 * 누르기 전에는 영상을 받지 않는다(preload="none" + 포스터 이미지).
 */
export default function PromoVideo({ video }: { video: Profile["video"] }) {
  if (!video) return null;
  return (
    <section className="mt-14" aria-labelledby="video-title">
      <div className="reveal">
        <SectionTitle id="video-title">영상으로 보기</SectionTitle>
      </div>
      <video
        className="reveal mx-auto mt-4 block aspect-[9/16] w-full max-w-[340px] rounded-[20px] border border-line bg-ink object-cover"
        src={video.src}
        poster={video.poster}
        controls
        muted
        playsInline
        loop
        preload="none"
        aria-label={video.label}
      />
    </section>
  );
}
