import Link from "next/link";
import { Github } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { XIcon } from "@/components/ui/XIcon";
import { SITE } from "@/lib/constants";

const footerNav = [
  {
    title: "Product",
    links: [
      { label: "Chat", href: "/chat" },
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Quickstart", href: "/docs/quickstart" },
      { label: "Self-hosting", href: "/docs/self-hosting" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-ink/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-ink/55">
              {SITE.tagline} Your conversations stay on your device — always.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={SITE.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OpenThena on X"
                className="flex h-9 w-9 items-center justify-center rounded-full glass text-ink/70 transition-colors hover:text-brand"
              >
                <XIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OpenThena on GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full glass text-ink/70 transition-colors hover:text-brand"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink/55 transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 text-xs text-ink/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. MIT licensed. Built in the
            open.
          </p>
          <p>No accounts · No tracking · No stored conversations.</p>
        </div>
      </div>
    </footer>
  );
}
