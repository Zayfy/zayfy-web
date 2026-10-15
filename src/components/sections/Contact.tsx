"use client";

import { Mail, MapPin, MessageCircle } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { LinkedinIcon } from "@/components/ui/LinkedinIcon";
import { Reveal } from "@/components/ui/Reveal";
import { contact, services, site } from "@/content/es/site";

const field =
  "mt-2 block min-h-12 w-full rounded-xl border border-glass-border bg-black/30 px-4 py-3 text-base text-white placeholder:text-ink-muted transition-[border-color,box-shadow] duration-200 hover:border-white/25 focus:border-brand-cyan focus:shadow-[0_0_0_3px_rgb(0_223_255/0.2)] focus:outline-none";

export function Contact() {
  const [service, setService] = useState("");
  const [status, setStatus] = useState<"idle" | "pending">("idle");

  useEffect(() => {
    const onPick = (e: Event) => setService((e as CustomEvent<string>).detail);
    window.addEventListener("zayfy:service", onPick);
    return () => window.removeEventListener("zayfy:service", onPick);
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("pending");
  }

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="section-pad relative overflow-hidden">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 size-[44rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-magenta/15 blur-[140px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-cyan">Contacto</p>
          <h2 id="contacto-title" className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            {contact.title}
          </h2>
          <p className="mt-4 text-lg text-ink-soft">{contact.text}</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form onSubmit={onSubmit} noValidate className="glass rounded-3xl p-6 sm:p-9">
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
                  rows={5}
                  required
                  placeholder="Cuéntanos qué necesitas, en qué punto estás y qué te gustaría lograr."
                  className={`${field} resize-y`}
                />
              </div>
              <Button type="submit" className="mt-7 w-full sm:w-auto" disabled={status === "pending"}>
                Enviar solicitud
              </Button>
              <p role="status" className="mt-4 min-h-6 text-sm text-ink-soft">
                {status === "pending" &&
                  "Vista previa: el envío real, la validación y el anti-spam se activan en la Etapa 3."}
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="glass h-full rounded-3xl p-6 sm:p-9">
              <h3 className="text-xl font-bold">Hablemos directamente</h3>
              <ul className="mt-6 space-y-5">
                <li>
                  <a href={`mailto:${site.email}`} className="group flex items-center gap-4 hover:text-brand-cyan">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-white/5 text-brand-cyan">
                      <Mail aria-hidden size={20} />
                    </span>
                    {site.email}
                  </a>
                </li>
                {site.whatsappUrl && (
                  <li>
                    <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-brand-cyan">
                      <span className="inline-flex size-11 items-center justify-center rounded-full bg-white/5 text-brand-cyan">
                        <MessageCircle aria-hidden size={20} />
                      </span>
                      Escríbenos por WhatsApp
                    </a>
                  </li>
                )}
                {site.linkedinUrl && (
                  <li>
                    <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-brand-cyan">
                      <span className="inline-flex size-11 items-center justify-center rounded-full bg-white/5 text-brand-cyan">
                        <LinkedinIcon />
                      </span>
                      Síguenos en LinkedIn
                    </a>
                  </li>
                )}
                <li className="flex items-center gap-4">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-white/5 text-brand-cyan">
                    <MapPin aria-hidden size={20} />
                  </span>
                  {site.location}
                </li>
              </ul>
              <p className="mt-8 text-sm text-ink-muted">
                Atendemos proyectos en Colombia y a nivel internacional.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
