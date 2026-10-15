import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  headingId: string;
  className?: string;
};

export function Section({ id, eyebrow, title, intro, children, headingId, className = "" }: Props) {
  return (
    <section id={id} aria-labelledby={headingId} className={`section-pad relative ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <header className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-cyan">
              {eyebrow}
            </p>
          )}
          <h2
            id={headingId}
            className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight"
          >
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-ink-soft">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
