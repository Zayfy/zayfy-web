import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { nav, services, site } from "@/content/es/site";

export function Footer() {
  return (
    <footer className="border-t border-glass-border bg-bg-raised/50">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo width={120} />
          <p className="mt-4 max-w-xs font-display font-semibold text-gradient">{site.tagline}</p>
        </div>

        <nav aria-label="Navegación del pie">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-muted">Navegación</h2>
          <ul className="mt-4 space-y-1">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={n.href} className="inline-flex min-h-9 items-center text-ink-soft hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-muted">Servicios</h2>
          <ul className="mt-4 space-y-1">
            {services.map((s) => (
              <li key={s.id}>
                <a href="#servicios" className="inline-flex min-h-9 items-center text-ink-soft hover:text-white">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-muted">Contacto</h2>
          <ul className="mt-4 space-y-1 text-ink-soft">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-9 items-center hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="inline-flex min-h-9 items-center">{site.location}</li>
            {site.whatsappUrl && (
              <li>
                <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center hover:text-white">
                  WhatsApp
                </a>
              </li>
            )}
            {site.linkedinUrl && (
              <li>
                <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center hover:text-white">
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-glass-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Zayfy. Todos los derechos reservados.</p>
          <Link href="/privacidad" className="inline-flex min-h-9 items-center hover:text-white">
            Aviso de privacidad y tratamiento de datos
          </Link>
        </div>
      </div>
    </footer>
  );
}
