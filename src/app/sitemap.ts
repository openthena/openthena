import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { DOC_SLUGS } from "@/components/docs/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/chat", "/docs", "/privacy", "/terms"].map(
    (path) => ({
      url: `${SITE.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const docRoutes = DOC_SLUGS.map((slug) => ({
    url: `${SITE.url}/docs/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...docRoutes];
}
