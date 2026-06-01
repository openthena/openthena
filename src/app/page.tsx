import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PrivacyShowcase } from "@/components/landing/PrivacyShowcase";
import { TechStack } from "@/components/landing/TechStack";
import { OpenSource } from "@/components/landing/OpenSource";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />
        <PrivacyShowcase />
        <TechStack />
        <OpenSource />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
