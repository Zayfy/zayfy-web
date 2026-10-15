import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { approach } from "@/content/es/site";

export function Process() {
  return (
    <Section
      id="enfoque"
      headingId="enfoque-title"
      eyebrow="Nuestro enfoque"
      title="Un proceso simple para resultados reales"
      intro="Cuatro etapas, comunicación clara y un aliado a tu lado en cada una."
      className="bg-bg-raised/60"
    >
      <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
        <span
          aria-hidden
          className="absolute left-[1.35rem] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-brand-cyan via-brand-violet to-brand-magenta opacity-50 lg:left-[12.5%] lg:right-[12.5%] lg:top-[1.35rem] lg:h-px lg:w-auto lg:bg-gradient-to-r"
        />
        {approach.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 0.1} className="relative pl-16 lg:pl-0 lg:text-center">
            <span className="absolute left-0 top-0 flex size-11 items-center justify-center rounded-full border border-brand-cyan/50 bg-bg-base font-display font-bold text-brand-cyan shadow-[0_0_24px_rgb(0_223_255/0.3)] lg:static lg:mx-auto">
              {i + 1}
            </span>
            <h3 className="text-xl font-bold lg:mt-5">{step.title}</h3>
            <p className="mt-2 text-ink-soft">{step.text}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
