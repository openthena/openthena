import { Github, Star, GitFork, Scale } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/constants";

export function OpenSource() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] glass-strong p-10 text-center md:p-16">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-aurora-violet/20 blur-[100px]" />
            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-950 ring-1 ring-brand/30">
                <Github className="h-8 w-8 text-brand" />
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                Open source, end to end
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-ink/65">
                Audit it, fork it, improve it. OpenThena is MIT-licensed and
                built entirely in the open — because trust requires
                transparency.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-ink/60">
                <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2">
                  <Scale className="h-4 w-4 text-brand" /> MIT License
                </span>
                <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2">
                  <Star className="h-4 w-4 text-brand" /> Star on GitHub
                </span>
                <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2">
                  <GitFork className="h-4 w-4 text-brand" /> Fork & self-host
                </span>
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href={SITE.github} external size="lg">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </Button>
                <Button href="/docs/self-hosting" variant="secondary" size="lg">
                  Self-hosting guide
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
