import AssetImage from "@/components/AssetImage";
import type { Profile } from "@/config/profile";

export default function Installs({ installs }: { installs: Profile["installs"] }) {
  return (
    <section className="mt-10" aria-labelledby="installs-title">
      <h2 id="installs-title" className="text-lg font-bold">
        실제 납품 현장
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-2">
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
