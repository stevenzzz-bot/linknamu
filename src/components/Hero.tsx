import AssetImage from "@/components/AssetImage";
import type { Profile } from "@/config/profile";

export default function Hero({ hero }: { hero: Profile["hero"] }) {
  return (
    <div className="rise settle relative" style={{ "--i": 0 } as React.CSSProperties}>
      <AssetImage
        src={hero.src}
        alt={hero.alt}
        sizes="(max-width: 480px) 100vw, 448px"
        priority
        className="aspect-[4/3] rounded-[20px]"
      />
      <span className="absolute bottom-3 left-3 rounded-md bg-white/95 px-2 py-1 text-xs font-semibold text-ink shadow-sm">
        {hero.label}
      </span>
    </div>
  );
}
