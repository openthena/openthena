import { Lock, Database, EyeOff, Cookie } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const promises = [
  {
    icon: Database,
    title: "No database",
    description: "Conversations are never persisted server-side. There is no table to leak.",
  },
  {
    icon: EyeOff,
    title: "No tracking",
    description: "No analytics, no fingerprinting, no third-party scripts watching you.",
  },
  {
    icon: Cookie,
    title: "No cookies",
    description: "We don't set advertising or identity cookies. Nothing follows you around.",
  },
  {
    icon: Lock,
    title: "Local-only history",
    description: "Your chats live in your browser's storage and clear when you say so.",
  },
];

export function PrivacyShowcase() {
  return (
    <section id="privacy" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] glass-strong">
          <div className="grid items-center gap-10 p-8 md:grid-cols-2 md:p-14">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
                The privacy promise
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                We store <span className="text-gradient-brand">nothing</span>.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/65">
                Most AI products log every prompt to improve their models — and
                their bottom line. OpenThena takes the opposite stance: the
                server is a stateless relay. Your words pass through and vanish.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-navy-950/60 px-5 py-4 font-mono text-sm text-ink/70 ring-1 ring-ink/10">
                <span className="text-green-400">●</span>
                logs_written ={" "}
                <span className="text-brand">0</span>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {promises.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl bg-navy-950/40 p-6 ring-1 ring-ink/10">
                    <p.icon className="h-6 w-6 text-brand" />
                    <h3 className="mt-4 font-semibold text-ink">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/55">
                      {p.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
