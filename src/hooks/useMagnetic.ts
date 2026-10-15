"use client";

import { useEffect, useRef } from "react";

// Efecto "imán" para botones. Solo en dispositivos con puntero preciso y sin
// movimiento reducido; GSAP se descarga la primera vez que alguien se acerca.
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let cancelled = false;
    let teardown = () => {};

    const arm = async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(el, {
          x: x * strength,
          y: y * strength,
          rotationX: -y * 0.12,
          rotationY: x * 0.12,
          scale: 1.04,
          transformPerspective: 700,
          ease: "power2.out",
          duration: 0.4,
        });
      };
      const onLeave = () =>
        gsap.to(el, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: "elastic.out(1, 0.35)",
          duration: 1.1,
        });

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      teardown = () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: "transform" });
      };
    };

    el.addEventListener("pointerenter", arm, { once: true });

    return () => {
      cancelled = true;
      el.removeEventListener("pointerenter", arm);
      teardown();
    };
  }, [strength]);

  return ref;
}
