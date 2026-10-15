import Image from "next/image";
import logo from "../../../public/brand/zayfy-logo.webp";

type Props = { className?: string; priority?: boolean; width?: number };

export function Logo({ className, priority, width = 130 }: Props) {
  return (
    <Image
      src={logo}
      alt="Zayfy"
      width={width}
      height={Math.round((width * logo.height) / logo.width)}
      priority={priority}
      className={className}
    />
  );
}
