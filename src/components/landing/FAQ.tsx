import { FAQS } from "@/lib/constants";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
            FAQ
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Questions, answered
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <Accordion items={FAQS} />
        </Reveal>
      </div>
    </section>
  );
}
