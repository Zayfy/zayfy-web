import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/content/es/site";

export function About() {
  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-title"
      className="section-pad relative overflow-hidden bg-bg-raised/60"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/20 blur-[120px]"
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-cyan">
            Sobre Zayfy
          </p>
          <h2 id="nosotros-title" className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            {about.title}
          </h2>
        </Reveal>
        <div className="mx-auto mt-8 max-w-2xl space-y-5 text-lg text-ink-soft">
          {about.paragraphs.map((p, i) => (
            <Reveal key={p} delay={0.08 * (i + 1)}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <p className="mt-10 font-display text-[clamp(1.4rem,3vw,2rem)] font-bold leading-snug text-gradient">
            {about.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
