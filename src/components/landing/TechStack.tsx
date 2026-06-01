import { Reveal } from "@/components/ui/Reveal";

const stack = [
  {
    name: "LiteLLM-style gateway",
    role: "Unified model interface",
    detail:
      "One OpenAI-format gateway in front of every model. Swap providers with a single env var — your UI never changes.",
  },
  {
    name: "Xiaomi MiMo",
    role: "The reasoning brain",
    detail:
      "MiMo v2.5 delivers fast, capable, multilingual reasoning through an OpenAI-compatible endpoint.",
  },
  {
    name: "Next.js on Vercel",
    role: "Edge delivery",
    detail:
      "Server-side streaming on the edge keeps responses instant and the deployment footprint tiny.",
  },
];

export function TechStack() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
            Under the hood
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            A stack you can <span className="text-gradient">actually read</span>
          </h2>
          <p className="mt-4 text-lg text-ink/60">
            No black boxes. Every layer is open source and documented.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {stack.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <div className="h-full rounded-3xl glass p-7">
                <p className="text-xs font-medium uppercase tracking-wider text-brand/80">
                  {s.role}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-ink">
                  {s.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {s.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
