import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { principles } from "@/content/es/site";

export function WhyZayfy() {
  return (
    <Section
      headingId="porque-title"
      eyebrow="Principios"
      title="¿Por qué Zayfy?"
      intro="Lo que guía cada decisión técnica y cada conversación contigo."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((p, i) => (
          <Reveal as="li" key={p.title} delay={(i % 3) * 0.07}>
            <div className="glass group h-full rounded-2xl p-6 transition-[border-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-brand-cyan/50">
              <span className="relative inline-flex size-12 items-center justify-center rounded-xl bg-white/5 text-brand-cyan transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                <p.icon aria-hidden size={24} />
              </span>
              <h3 className="mt-5 text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-ink-soft">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
