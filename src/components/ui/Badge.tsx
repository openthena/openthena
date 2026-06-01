import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-ink/80",
        className,
      )}
    >
      {children}
    </span>
  );
}
