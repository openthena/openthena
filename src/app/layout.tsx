import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { AuroraBackground } from "@/components/layout/AuroraBackground";
import { Preloader } from "@/components/preloader/Preloader";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "OpenThena",
    "privacy AI",
    "open source AI",
    "LiteLLM",
    "Xiaomi MiMo",
    "private chatbot",
    "self-hosted AI",
  ],
  authors: [{ name: "OpenThena" }],
  icons: {
    icon: [{ url: "/openthena.svg", type: "image/svg+xml" }],
    shortcut: "/openthena.svg",
    apple: "/openthena.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    creator: "@openthena",
  },
  alternates: { canonical: SITE.url },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04101f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="grain antialiased">
        <AuroraBackground />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
