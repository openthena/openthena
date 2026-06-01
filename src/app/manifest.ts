import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#04101f",
    theme_color: "#04101f",
    icons: [
      { src: "/openthena.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
