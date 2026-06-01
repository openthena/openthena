import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  withWordmark = true,
  size = 32,
  href = "/",
}: {
  className?: string;
  withWordmark?: boolean;
  size?: number;
  href?: string | null;
}) {
  const mark = (
    <span className="flex items-center gap-2.5">
      <span
        className="relative shrink-0 overflow-hidden rounded-xl"
        style={{ width: size, height: size }}
      >
        <Image
          src="/openthena.svg"
          alt="OpenThena logo"
          width={size}
          height={size}
          priority
          className="h-full w-full object-contain"
        />
      </span>
      {withWordmark && (
        <span className="text-lg font-semibold tracking-tight text-ink">
          Open<span className="text-brand">Thena</span>
        </span>
      )}
    </span>
  );

  if (href === null) {
    return <span className={cn(className)}>{mark}</span>;
  }

  return (
    <Link href={href} className={cn("inline-flex", className)}>
      {mark}
    </Link>
  );
}
