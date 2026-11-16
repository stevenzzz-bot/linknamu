import AssetImage from "@/components/AssetImage";
import type { Profile } from "@/config/profile";

export default function Hero({ hero }: { hero: Profile["hero"] }) {
  return (
    <div className="rise settle" style={{ "--i": 0 } as React.CSSProperties}>
      <AssetImage
        src={hero.src}
        alt={hero.alt}
        sizes="(max-width: 480px) 100vw, 448px"
        priority
        className="aspect-video rounded-xl"
      />
    </div>
  );
}
