import Image from "next/image";
import { hasPublicFile } from "@/lib/assets";

type Props = {
  src: string;
  alt: string;
  /** 부모 박스의 비율·모서리는 className 으로 지정 (예: "aspect-[4/3] rounded-[20px]") */
  className?: string;
  sizes: string;
  priority?: boolean;
};

/**
 * public/ 이미지를 박스에 꽉 채워 보여준다.
 * 파일이 없으면 회색 박스 + 파일명으로 자리만 표시한다.
 */
export default function AssetImage({ src, alt, className = "", sizes, priority }: Props) {
  return (
    <div className={`relative overflow-hidden bg-[#e4e0da] ${className}`}>
      {hasPublicFile(src) ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <span className="absolute inset-0 grid place-items-center text-xs text-muted">{src.replace(/^\//, "")}</span>
      )}
    </div>
  );
}
