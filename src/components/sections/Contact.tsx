"use client";

import { Mail, MapPin, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { LinkedinIcon } from "@/components/ui/LinkedinIcon";
import { contact, services, site } from "@/content/es/site";
import { useMagnetic } from "@/hooks/useMagnetic";

const field =
  "mt-2 block min-h-12 w-full rounded-xl border border-glass-border bg-black/30 px-4 py-3 text-base text-white placeholder:text-ink-muted transition-[border-color,box-shadow] duration-200 hover:border-white/25 focus:border-brand-cyan focus:shadow-[0_0_0_3px_rgb(0_213_253/0.2)] focus:outline-none";

const pill =
  "cin-pill inline-flex min-h-12 w-full items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold text-ink-soft will-change-transform sm:w-auto sm:text-base";

const CURTAIN = "(min-width: 1024px) and (min-height: 780px)";

function MarqueeGroup() {
  const items = [...services.map((s) => s.name), "Beyond Code. Beyond Limits."];
  return (
    <div className="flex items-center gap-12 px-6">
      {items.map((label) => (
        <span key={label} className="flex items-center gap-12">
          {label}
          <span className="size-1.5 rounded-full bg-brand-magenta" />
        </span>
      ))}
    </div>
  );
}

function ContactPill({ href, icon, children, external }: { href: string; icon: ReactNode; children: ReactNode; external?: boolean }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.25);
  return (
    <a
      ref={ref}
      href={href}
      className={pill}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="text-brand-cyan">{icon}</span>
      {children}
    </a>
  );
}

export function Contact() {
  const markerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLElement>(null);
  const giantRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const submitRef = useMagnetic<HTMLButtonElement>(0.2);

  const [service, setService] = useState("");
  const [status, setStatus] = useState<"idle" | "pending">("idle");

  useEffect(() => {
    const onPick = (e: Event) => setService((e as CustomEvent<string>).detail);
    window.addEventListener("zayfy:service", onPick);
    return () => window.removeEventListener("zayfy:service", onPick);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const marker = markerRef.current;
    if (!wrapper || !marker) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let revert = () => {};

    // GSAP se descarga solo cuando la sección está a una pantalla de distancia
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();
        const content = [leftRef.current, formRef.current];

        // En modo cortina la sección está pegada abajo, así que el avance se mide
        // con el marcador, que sí se mueve con el scroll.
        mm.add(CURTAIN, () => {
          gsap.fromTo(
            giantRef.current,
            { y: "10vh", scale: 0.85, opacity: 0 },
            {
              y: "0vh",
              scale: 1,
              opacity: 1,
              ease: "power1.out",
              scrollTrigger: { trigger: marker, start: "top 80%", end: "top top", scrub: 1 },
            },
          );
          gsap.fromTo(
            content,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: { trigger: marker, start: "top 50%", end: "top top", scrub: 1 },
            },
          );
        });

        mm.add("(max-width: 1023.98px), (max-height: 779.98px)", () => {
          gsap.fromTo(
            giantRef.current,
            { y: "6vh", opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power1.out",
              scrollTrigger: { trigger: wrapper, start: "top 85%", end: "bottom 60%", scrub: 1 },
            },
          );
          gsap.fromTo(
            content,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: { trigger: wrapper, start: "top 70%", once: true },
            },
          );
        });

        revert = () => mm.revert();
        document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh());
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    io.observe(marker);

    return () => {
      cancelled = true;
      io.disconnect();
      revert();
    };
  }, []);

  // En modo cortina el contenido está oculto bajo la página: si el foco entra por
  // teclado antes de que se revele, se desplaza para mostrarlo completo.
  const revealOnFocus = () => {
    const marker = markerRef.current;
    const wrapper = wrapperRef.current;
    if (!marker || !wrapper) return;
    if (getComputedStyle(wrapper).position !== "sticky") return;
    const top = marker.getBoundingClientRect().top;
    if (top > 1) window.scrollTo({ top: top + window.scrollY, behavior: "instant" });
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("pending");
  }

  return (
    <>
      {/* Ancla de #contacto: marca dónde empieza el espacio de la sección */}
      <div id="contacto" ref={markerRef} aria-hidden className="scroll-mt-[-5.5rem]" />
      <section ref={wrapperRef} aria-labelledby="contacto-title" onFocus={revealOnFocus} className="curtain">
      <div className="curtain-inner">
        <div
          aria-hidden
          className="cin-aurora animate-cin-breathe pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px]"
        />
        <div aria-hidden className="cin-grid pointer-events-none absolute inset-0 z-0" />
        <div
          ref={giantRef}
          aria-hidden
          className="cin-giant pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
        >
          ZAYFY
        </div>

        <div
          aria-hidden
          className="absolute left-0 top-10 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-glass-border bg-bg-base/60 py-4 shadow-2xl backdrop-blur-md lg:top-24"
        >
          <div className="animate-cin-marquee flex w-max text-xs font-bold uppercase tracking-[0.3em] text-ink-muted md:text-sm">
            <MarqueeGroup />
            <MarqueeGroup />
          </div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 pb-16 pt-40 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:pb-10 lg:pt-44">
          <div ref={leftRef}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-cyan">Contacto</p>
            <h2
              id="contacto-title"
              className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight"
            >
              {contact.title}
            </h2>
            <p className="mt-4 max-w-lg text-lg text-ink-soft">{contact.text}</p>

            <ul className="mt-8 flex flex-col items-stretch gap-3 sm:items-start">
              <li>
                <ContactPill href={`mailto:${site.email}`} icon={<Mail aria-hidden size={20} />}>
                  {site.email}
                </ContactPill>
              </li>
              {site.whatsappUrl && (
                <li>
                  <ContactPill href={site.whatsappUrl} icon={<MessageCircle aria-hidden size={20} />} external>
                    Escríbenos por WhatsApp
                  </ContactPill>
                </li>
              )}
              {site.linkedinUrl && (
                <li>
                  <ContactPill href={site.linkedinUrl} icon={<LinkedinIcon />} external>
                    Síguenos en LinkedIn
                  </ContactPill>
                </li>
              )}
              <li>
                <p className={`${pill.replace("cin-pill", "cin-pill-flat")} cursor-default`}>
                  <span className="text-brand-cyan">
                    <MapPin aria-hidden size={20} />
                  </span>
                  {site.location}
                </p>
              </li>
            </ul>
            <p className="mt-6 text-sm text-ink-muted">Atendemos proyectos en Colombia y a nivel internacional.</p>
          </div>

          <div ref={formRef}>
            <form onSubmit={onSubmit} noValidate className="glass rounded-3xl p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nombre" className="text-sm font-medium">
                    Nombre <span aria-hidden className="text-brand-magenta">*</span>
                  </label>
                  <input id="nombre" name="nombre" type="text" autoComplete="name" required className={field} />
                </div>
                <div>
                  <label htmlFor="empresa" className="text-sm font-medium">
                    Empresa <span className="text-ink-muted">(opcional)</span>
                  </label>
                  <input id="empresa" name="empresa" type="text" autoComplete="organization" className={field} />
                </div>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="correo" className="text-sm font-medium">
                    Correo electrónico <span aria-hidden className="text-brand-magenta">*</span>
                  </label>
                  <input id="correo" name="correo" type="email" autoComplete="email" required className={field} />
                </div>
                <div>
                  <label htmlFor="servicio" className="text-sm font-medium">
                    Servicio de interés
                  </label>
                  <select
                    id="servicio"
                    name="servicio"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`${field} cursor-pointer`}
                  >
                    <option value="">Aún no lo sé</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id} className="bg-bg-raised">
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="mensaje" className="text-sm font-medium">
                  Descripción del proyecto <span aria-hidden className="text-brand-magenta">*</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  required
                  placeholder="Cuéntanos qué necesitas, en qué punto estás y qué te gustaría lograr."
                  className={`${field} resize-y`}
                />
              </div>
              <Button ref={submitRef} type="submit" className="mt-6 w-full sm:w-auto" disabled={status === "pending"}>
                Enviar solicitud
              </Button>
              <p role="status" className="mt-3 min-h-6 text-sm text-ink-soft">
                {status === "pending" &&
                  "Vista previa: el envío real, la validación y el anti-spam se activan en la Etapa 3."}
              </p>
            </form>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
