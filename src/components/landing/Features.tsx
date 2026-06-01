import { FEATURES } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export function Features() {
  return (
    <section id="features" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
            Why OpenThena
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Powerful AI, <span className="text-gradient">private by default</span>
          </h2>
          <p className="mt-4 text-lg text-ink/60">
            Everything you expect from a modern assistant — without the
            surveillance, lock-in, or hidden telemetry.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.06}>
              <article className="group h-full rounded-3xl glass p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-aurora-cyan/20 to-aurora-blue/20 ring-1 ring-inset ring-brand/20 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-6 w-6 text-brand" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {feature.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
