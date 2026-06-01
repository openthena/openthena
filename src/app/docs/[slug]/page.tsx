import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocArticle } from "@/components/docs/DocArticle";
import { DOC_PAGES, DOC_SLUGS } from "@/components/docs/content";

export function generateStaticParams() {
  return DOC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = DOC_PAGES[slug];
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function DocPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = DOC_PAGES[slug];
  if (!page) notFound();
  return <DocArticle page={page} />;
}
