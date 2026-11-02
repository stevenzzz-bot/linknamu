import Image from "next/image";

type Props = { name: string; bio: string; avatar: string };

export default function ProfileHeader({ name, bio, avatar }: Props) {
  return (
    <header className="mb-7 flex flex-col items-center text-center">
      {avatar && (
        <Image
          src={avatar}
          alt={`${name} 프로필 사진`}
          width={96}
          height={96}
          priority
          unoptimized={avatar.endsWith(".svg")}
          className="h-24 w-24 rounded-full border-4 border-white bg-brand-light object-cover shadow-md dark:border-gray-900 dark:bg-brand-deep"
        />
      )}
      <h1 className="mt-3 text-xl font-bold [word-break:keep-all] sm:text-2xl">{name}</h1>
      {bio && <p className="mt-1 text-gray-600 [word-break:keep-all] dark:text-gray-400">{bio}</p>}
    </header>
  );
}
