import { profile, type LinkItem, type SocialItem } from "@/config/profile";

type Trackable = Pick<LinkItem | SocialItem, "id" | "url">;

function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

function validate(items: Trackable[]): void {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) throw new Error(`링크 id 중복: ${item.id}`);
    seen.add(item.id);
    if (!isHttpUrl(item.url)) throw new Error(`http(s) URL만 허용됩니다: ${item.url}`);
  }
}

export const links: LinkItem[] = profile.links;
export const socials: SocialItem[] = profile.socials;

/** /go 로 집계되는 모든 항목 (메인 링크 + SNS) */
export const trackables: Trackable[] = [...links, ...socials];
validate(trackables);

export function findLink(id: string): Trackable | undefined {
  return trackables.find((item) => item.id === id);
}
