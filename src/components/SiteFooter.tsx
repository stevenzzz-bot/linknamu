import Icon from "@/components/Icon";
import type { Profile } from "@/config/profile";

type Props = { contact: Profile["contact"]; business: Profile["business"] };

/** 하단: 전화 버튼 · 이메일 · 사업자 정보 */
export default function SiteFooter({ contact, business }: Props) {
  return (
    <footer className="mx-auto w-full max-w-xl px-4 pb-10 pt-8">
      <a
        href={`tel:${contact.phone}`}
        className="flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border border-accent px-4 py-3 font-semibold text-accent transition hover:bg-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <Icon name="phone" className="h-5 w-5" />
        <span>전화 상담 {contact.phoneLabel}</span>
      </a>
      <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">{contact.hours}</p>

      <a
        href={`mailto:${contact.email}`}
        className="mx-auto mt-4 flex w-fit items-center gap-1.5 text-sm text-gray-600 underline-offset-4 hover:text-accent hover:underline dark:text-gray-300"
      >
        <Icon name="mail" className="h-4 w-4" />
        {contact.email}
      </a>

      <address className="mt-8 border-t border-gray-200 pt-5 text-center text-xs not-italic leading-relaxed text-gray-500 [word-break:keep-all] dark:border-gray-800 dark:text-gray-400">
        {business.name} · 대표 {business.owner} · 사업자등록번호 {business.registrationNo}
        <br />
        {business.address}
      </address>
    </footer>
  );
}
