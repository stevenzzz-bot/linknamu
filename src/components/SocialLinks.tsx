import Icon from "@/components/Icon";
import type { SocialItem } from "@/config/profile";

/** SNS 아이콘 한 줄 (가운데 정렬). /go 를 거치므로 클릭 수도 집계된다. */
export default function SocialLinks({ socials }: { socials: SocialItem[] }) {
  if (socials.length === 0) return null;
  return (
    <ul className="mt-6 flex justify-center gap-3" aria-label="SNS">
      {socials.map((s) => (
        <li key={s.id}>
          <a
            href={`/go/${encodeURIComponent(s.id)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className="grid h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
          >
            <Icon name={s.icon} className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
