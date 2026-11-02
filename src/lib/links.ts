import { profile, type LinkItem } from "@/config/profile";

function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

function validate(links: LinkItem[]): LinkItem[] {
  const seen = new Set<string>();
  for (const link of links) {
    if (seen.has(link.id)) throw new Error(`링크 id 중복: ${link.id}`);
    seen.add(link.id);
    if (!isHttpUrl(link.url)) throw new Error(`http(s) URL만 허용됩니다: ${link.url}`);
  }
  return links;
}

export const links = validate(profile.links);

export function findLink(id: string): LinkItem | undefined {
  return links.find((link) => link.id === id);
}
