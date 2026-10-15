import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { ParticleField } from "@/components/effects/ParticleField";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { hero } from "@/content/es/site";
import heroArt from "../../../public/brand/hero-art.webp";
import symbol from "../../../public/brand/zayfy-symbol.webp";

const areas = ["Software", "Cloud", "DevOps", "AI"];

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-dvh items-center overflow-hidden pb-24 pt-28 lg:pt-32"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-1/4 top-0 size-[50rem] rounded-full bg-brand-violet/15 blur-[140px]" />
        <Image
          src={heroArt}
          alt=""
          priority
          sizes="(min-width: 1400px) 1400px, 120vw"
          className="absolute bottom-0 right-0 h-auto w-[min(130%,1400px)] max-w-none select-none opacity-90 [mask-image:linear-gradient(to_right,transparent_0%,black_38%)]"
        />
        <ParticleField />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-base to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <p className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-ink-soft">
              <span aria-hidden className="size-2 rounded-full bg-brand-cyan shadow-[0_0_10px_#00d5fd]" />
              {hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 id="hero-title" className="text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[1.05] tracking-tight">
              Hello, World.
              <span className="mt-1 block text-gradient animate-gradient">We are Zayfy.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 font-display text-xl font-semibold tracking-wide text-white sm:text-2xl">
              Beyond Code. <span className="text-brand-violet-soft">Beyond Limits.</span>
            </p>
            <p className="mt-4 max-w-xl text-lg text-ink-soft">{hero.text}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#servicios" variant="secondary">
                Explorar servicios
                <ArrowDown aria-hidden size={18} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </ButtonLink>
              <ButtonLink href="#contacto">Hablemos de tu proyecto</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <ul
              aria-label="Áreas de especialidad"
              className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-soft sm:gap-x-4 sm:text-sm sm:tracking-[0.22em]"
            >
              {areas.map((a, i) => (
                <li key={a} className="flex items-center gap-3 sm:gap-4">
                  {a}
                  {i < areas.length - 1 && (
                    <span aria-hidden className="size-1.5 rounded-full bg-brand-magenta" />
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div aria-hidden className="relative mx-auto hidden aspect-square w-full max-w-[30rem] lg:block">
          <div className="absolute inset-[-6%] animate-orbit rounded-full border border-brand-violet/30">
            <span className="absolute -top-1.5 left-1/2 size-3 rounded-full bg-brand-cyan shadow-[0_0_18px_#00d5fd]" />
          </div>
          <div className="absolute inset-[15%] rounded-full bg-brand-violet/30 blur-[80px]" />
          <div className="absolute inset-0 animate-float">
            <Image src={symbol} alt="" priority sizes="480px" className="size-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
