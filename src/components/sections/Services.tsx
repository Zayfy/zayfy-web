"use client";

import { ArrowRight, Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink, Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { services, type Service } from "@/content/es/site";

function pickService(id: string) {
  window.dispatchEvent(new CustomEvent("zayfy:service", { detail: id }));
}

function ServiceDialog({ service, onClose }: { service: Service | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (service && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!service && dialog.open) dialog.close();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [service]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="service-dialog-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[min(92vw,42rem)] max-h-[88dvh] overflow-y-auto rounded-3xl border border-glass-border bg-bg-raised p-0 text-ink shadow-[0_0_80px_rgb(120_53_255/0.35)] backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      {service && (
        <div className="relative p-6 sm:p-9" style={{ ["--accent" as string]: service.accent }}>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle"
            className="glass absolute right-4 top-4 inline-flex size-11 cursor-pointer items-center justify-center rounded-full"
          >
            <X aria-hidden size={20} />
          </button>
          <service.icon aria-hidden size={34} style={{ color: "var(--accent)" }} />
          <h3 id="service-dialog-title" className="mt-4 text-3xl font-bold">
            {service.name}
          </h3>
          <p className="mt-3 text-ink-soft">{service.description}</p>
          <p className="mt-4 font-display text-lg font-semibold">{service.value}</p>
          <h4 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Capacidades
          </h4>
          <ul className="grid gap-3 sm:grid-cols-2">
            {service.capabilities.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-ink-soft">
                <Check aria-hidden size={18} className="mt-1 shrink-0" style={{ color: "var(--accent)" }} />
                {c}
              </li>
            ))}
          </ul>
          <ButtonLink
            href="#contacto"
            className="mt-9 w-full sm:w-auto"
            onClick={() => {
              pickService(service.id);
              onClose();
            }}
          >
            {service.cta}
            <ArrowRight aria-hidden size={18} />
          </ButtonLink>
        </div>
      )}
    </dialog>
  );
}

export function Services() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <Section
      id="servicios"
      headingId="servicios-title"
      eyebrow="Servicios"
      title="Cuatro formas de llevar tu tecnología más lejos"
      intro="Desde rescatar una infraestructura hasta automatizar tu operación con inteligencia artificial."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal as="li" key={s.id} delay={(i % 2) * 0.08}>
            <article
              className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6transition-[border-color,box-shadow,transform] duration-300 ease-out-expo hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_60%,transparent)] hover:shadow-[0_0_48px_color-mix(in_srgb,var(--accent)_28%,transparent)] sm:p-8"
              style={{ ["--accent" as string]: s.accent }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: "var(--accent)" }}
              />
              <div className="relative flex items-center gap-4">
                <span
                  className="inline-flex size-14 items-center justify-center rounded-2xl border border-glass-border bg-black/30"
                  style={{ color: "var(--accent)" }}
                >
                  <s.icon aria-hidden size={28} />
                </span>
                <h3 className="text-2xl font-bold">{s.name}</h3>
              </div>
              <p className="relative mt-5 font-display text-lg font-semibold">{s.value}</p>
              <p className="relative mt-2 text-ink-soft">{s.concept}</p>

              <ul className="relative mt-6 grid gap-3 sm:grid-cols-2">
                {s.highlights.map((h) => (
                  <li key={h.label} className="flex items-center gap-3 text-sm text-ink-soft">
                    <h.icon aria-hidden size={18} className="shrink-0" style={{ color: "var(--accent)" }} />
                    {h.label}
                  </li>
                ))}
              </ul>

              <div className="relative mt-auto flex flex-col gap-2 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
                <Button variant="secondary" onClick={() => setSelected(s)} aria-haspopup="dialog">
                  Conocer más
                  <span className="sr-only"> sobre {s.name}</span>
                </Button>
                <a
                  href="#contacto"
                  onClick={() => pickService(s.id)}
                  className="inline-flex min-h-12 items-center gap-2 px-2 font-semibold text-brand-cyan transition-colors hover:text-white"
                >
                  {s.cta}
                  <ArrowRight aria-hidden size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
      <ServiceDialog service={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
