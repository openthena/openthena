import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DOC_GROUPS, DOC_PAGES, type DocPage } from "./content";

// Flattened, ordered list of slugs for prev/next navigation.
const ORDERED = DOC_GROUPS.flatMap((g) => g.pages.map((p) => p.slug));

export function DocArticle({ page }: { page: DocPage }) {
  const idx = ORDERED.indexOf(page.slug);
  const prev = idx > 0 ? ORDERED[idx - 1] : null;
  const next = idx < ORDERED.length - 1 ? ORDERED[idx + 1] : null;

  const link = (slug: string) => (slug ? `/docs/${slug}` : "/docs");

  return (
    <article className="pb-24">
      <header className="mb-8 border-b border-ink/10 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
          Docs
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {page.title}
        </h1>
        <p className="mt-3 text-lg text-ink/60">{page.description}</p>
      </header>

      <div className="prose-openthena max-w-none">{page.body}</div>

      <nav className="mt-14 flex items-center justify-between gap-4 border-t border-ink/10 pt-8">
        {prev !== null ? (
          <Link
            href={link(prev)}
            className="group flex items-center gap-2 rounded-2xl glass px-5 py-3 text-sm text-ink/70 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 text-brand" />
            {DOC_PAGES[prev].title}
          </Link>
        ) : (
          <span />
        )}
        {next !== null && (
          <Link
            href={link(next)}
            className="group ml-auto flex items-center gap-2 rounded-2xl glass px-5 py-3 text-sm text-ink/70 transition-colors hover:text-ink"
          >
            {DOC_PAGES[next].title}
            <ArrowRight className="h-4 w-4 text-brand" />
          </Link>
        )}
      </nav>
    </article>
  );
}
