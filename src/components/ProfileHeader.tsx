import AssetImage from "@/components/AssetImage";

type Props = { name: string; bio: string; logo: string };

export default function ProfileHeader({ name, bio, logo }: Props) {
  return (
    <header className="mt-6 flex items-center gap-4">
      <AssetImage
        src={logo}
        alt={`${name} 로고`}
        sizes="72px"
        className="h-[72px] w-[72px] flex-none rounded-2xl border border-line !bg-surface"
      />
      <div className="min-w-0">
        <h1 className="text-[26px] font-extrabold leading-tight text-heading">{name}</h1>
        <p className="mt-1 text-[15px] leading-snug text-muted">{bio}</p>
      </div>
    </header>
  );
}
