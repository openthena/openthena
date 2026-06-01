import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-aurora-cyan to-aurora-blue text-navy-950 font-semibold shadow-[0_8px_30px_-8px_rgba(56,225,214,0.6)] hover:shadow-[0_10px_40px_-6px_rgba(56,225,214,0.8)] hover:-translate-y-0.5",
  secondary:
    "glass text-ink hover:bg-navy-700/50 hover:-translate-y-0.5",
  outline:
    "border border-ink/15 text-ink hover:border-brand/50 hover:text-brand",
  ghost: "text-ink/70 hover:text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base py-3.5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps & { href: string; external?: boolean };

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonAsButton | ButtonAsLink
>(function Button(props, ref) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, external } = props as ButtonAsLink;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, ...rest } =
    props as ButtonAsButton;
  return (
    <button ref={ref} className={classes} {...rest}>
      {children}
    </button>
  );
});
