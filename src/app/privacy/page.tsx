import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "OpenThena stores nothing. No accounts, no tracking, no server-side conversation logs.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-32">
        <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-ink/45">Last updated: June 2026</p>

        <div className="prose-openthena mt-10 max-w-none">
          <p>
            OpenThena is built so that privacy is guaranteed by architecture, not
            merely promised by policy. This page explains, in plain language,
            exactly what happens to your data.
          </p>

          <h2>What we collect</h2>
          <p>
            <strong>Nothing on our servers.</strong> OpenThena has no database,
            no user accounts, and no analytics. We do not log the content of your
            conversations.
          </p>

          <h2>Where your conversations live</h2>
          <p>
            Your chat history is stored exclusively in your own browser using{" "}
            <code>localStorage</code>. It never leaves your device through
            OpenThena. Clearing your conversations — or your browser data —
            permanently deletes it.
          </p>

          <h2>Model requests</h2>
          <p>
            To generate a response, your message is sent to the AI model provider
            configured for the deployment (by default, Xiaomi MiMo via an
            OpenAI-compatible API). That provider processes your prompt under its
            own terms and privacy policy. OpenThena adds no logging or storage in
            between; the API route is a stateless relay.
          </p>

          <h2>Cookies &amp; tracking</h2>
          <p>
            OpenThena sets no advertising or identity cookies and includes no
            third-party trackers or fingerprinting scripts.
          </p>

          <h2>Self-hosting</h2>
          <p>
            Because OpenThena is open source (MIT), you can host it yourself and
            route requests through your own model or a self-hosted LiteLLM proxy
            for complete control over data flow.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about privacy? Reach us on{" "}
            <a href={SITE.x} target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">X</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
