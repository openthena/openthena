import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";
import { DOC_PAGES } from "@/components/docs/content";

export const metadata: Metadata = {
  title: "Documentation",
  description: DOC_PAGES[""].description,
};

export default function DocsIndexPage() {
  return <DocArticle page={DOC_PAGES[""]} />;
}
