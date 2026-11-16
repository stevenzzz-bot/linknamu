import AssetImage from "@/components/AssetImage";

type Props = { name: string; bio: string; logo: string; stats?: { value: string; label: string }[] };

export default function ProfileHeader({ name, bio, logo, stats = [] }: Props) {
  return (
    <header className="rise mt-7" style={{ "--i": 1 } as React.CSSProperties}>
      <div className="flex items-center gap-3">
        <AssetImage src={logo} alt={`${name} 로고`} sizes="44px" className="h-11 w-11 flex-none rounded-xl !bg-surface" />
        <h1 className="text-[28px] font-extrabold leading-none text-heading">{name}</h1>
      </div>
      <p className="mt-4 text-[17px] font-semibold leading-snug text-ink">{bio}</p>
      {stats.length > 0 && (
        <p className="mt-1 text-[15px] text-muted">
          {stats.map((s, i) => (
            <span key={s.value} className="whitespace-nowrap">
              {i > 0 && <span aria-hidden="true"> · </span>}
              {s.value} {s.label}
            </span>
          ))}
        </p>
      )}
    </header>
  );
}
