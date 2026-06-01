import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-aurora-blue/20 via-navy-800/40 to-aurora-violet/20 p-10 text-center ring-1 ring-ink/10 md:p-16">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
            <div className="relative">
              <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Ask freely. <span className="text-gradient-brand">Stay private.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">
                Open the app and start a conversation. No sign-up, no setup —
                just you and an AI that forgets on purpose.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="/chat" size="lg">
                  Launch OpenThena
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
