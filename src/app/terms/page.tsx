import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms governing your use of OpenThena.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-32">
        <h1 className="text-4xl font-semibold tracking-tight">Terms of Use</h1>
        <p className="mt-3 text-sm text-ink/45">Last updated: June 2026</p>

        <div className="prose-openthena mt-10 max-w-none">
          <h2>Acceptance</h2>
          <p>
            By using OpenThena, you agree to these terms. If you do not agree,
            please do not use the service.
          </p>

          <h2>The service</h2>
          <p>
            OpenThena is an open-source AI assistant provided “as is”, without
            warranty of any kind. AI-generated responses may be inaccurate or
            incomplete — verify important information independently.
          </p>

          <h2>Acceptable use</h2>
          <p>
            You agree not to use OpenThena for unlawful purposes, to generate
            harmful content, or to abuse the underlying model providers&apos;
            services. You are responsible for your prompts and how you use the
            outputs.
          </p>

          <h2>No liability</h2>
          <p>
            To the fullest extent permitted by law, the OpenThena maintainers are
            not liable for any damages arising from your use of the software or
            its outputs.
          </p>

          <h2>Open-source license</h2>
          <p>
            OpenThena&apos;s source code is released under the MIT License. Your
            use, modification, and distribution of the code are governed by that
            license.
          </p>

          <h2>Changes</h2>
          <p>
            These terms may be updated over time. Continued use after changes
            constitutes acceptance of the revised terms.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
