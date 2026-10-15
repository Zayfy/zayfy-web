"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { nav } from "@/content/es/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-glass-border bg-bg-base/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
        <a href="#inicio" aria-label="Zayfy, ir al inicio" className="shrink-0">
          <Logo width={118} priority />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`relative inline-flex min-h-11 items-center px-4 text-sm font-medium transition-colors duration-200 hover:text-white ${
                    active === item.id ? "text-white" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-gradient transition-opacity duration-300 ${
                      active === item.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink href="#contacto" className="!min-h-11 !px-5 !py-2 text-sm">
              Hablemos de tu proyecto
            </ButtonLink>
          </div>
          <button
            type="button"
            className="glass inline-flex size-11 cursor-pointer items-center justify-center rounded-full lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-movil"
          className="fixed inset-x-0 top-16 z-[100] h-[calc(100dvh-4rem)] overflow-y-auto bg-bg-base/95 px-5 pb-10 pt-6 backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Principal móvil">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.id} className="border-b border-glass-border">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className="flex min-h-14 items-center font-display text-2xl font-semibold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink href="#contacto" onClick={() => setOpen(false)} className="mt-8 w-full">
            Hablemos de tu proyecto
          </ButtonLink>
        </div>
      )}
    </header>
  );
}
