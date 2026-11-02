import SectionTitle from "@/components/SectionTitle";
import AssetImage from "@/components/AssetImage";
import type { Profile } from "@/config/profile";

export default function Installs({ installs }: { installs: Profile["installs"] }) {
  return (
    <section className="mt-14" aria-labelledby="installs-title">
      <SectionTitle id="installs-title">실제 납품 현장</SectionTitle>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {installs.images.map((img) => (
          <AssetImage
            key={img.src}
            src={img.src}
            alt={img.alt}
            sizes="(max-width: 480px) 50vw, 224px"
            className="aspect-square rounded-xl"
          />
        ))}
      </div>
      <p className="mt-2 text-sm text-muted">{installs.caption}</p>
    </section>
  );
}
