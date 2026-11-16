import AssetImage from "@/components/AssetImage";

type Props = { name: string; bio: string; logo: string; stats?: { value: string; label: string }[] };

export default function ProfileHeader({ name, bio, logo, stats = [] }: Props) {
  return (
    <header className="rise mt-6 flex items-center gap-4" style={{ "--i": 1 } as React.CSSProperties}>
      <AssetImage
        src={logo}
        alt={`${name} 로고`}
        sizes="72px"
        className="h-[72px] w-[72px] flex-none rounded-2xl border border-line !bg-surface"
      />
      <div className="min-w-0">
        <h1 className="text-[26px] font-extrabold leading-tight text-heading">{name}</h1>
        <p className="mt-1 text-[15px] leading-snug text-muted">{bio}</p>
        {stats.length > 0 && (
          <p className="mt-1.5 text-sm text-muted">
            {stats.map((s, i) => (
              <span key={s.value} className="whitespace-nowrap">
                {i > 0 && <span aria-hidden="true"> · </span>}
                <strong className="font-bold text-ink">{s.value}</strong> {s.label}
              </span>
            ))}
          </p>
        )}
      </div>
    </header>
  );
}
