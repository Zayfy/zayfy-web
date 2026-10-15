import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/es/site";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  robots: { index: false },
};

export default function Privacidad() {
  return (
    <main id="contenido" className="mx-auto max-w-3xl px-5 py-28 sm:px-8">
      <Link href="/" className="text-brand-cyan hover:text-white">
        ← Volver al inicio
      </Link>
      <h1 className="mt-6 text-4xl font-bold">Aviso de privacidad y tratamiento de datos</h1>
      <p className="mt-6 rounded-2xl border border-brand-magenta/40 bg-brand-magenta/10 p-5 text-ink-soft">
        Borrador pendiente: el texto legal definitivo (Ley 1581 de 2012 y normas de protección de datos
        personales) debe ser redactado o revisado por la persona responsable antes de publicar el sitio.
      </p>
      <h2 className="mt-10 text-2xl font-semibold">Responsable</h2>
      <p className="mt-3 text-ink-soft">
        Zayfy, {site.location}. Contacto: {site.email}.
      </p>
      <h2 className="mt-10 text-2xl font-semibold">Datos que recopilamos</h2>
      <p className="mt-3 text-ink-soft">
        Los datos que envías por el formulario de contacto: nombre, empresa (opcional), correo electrónico,
        servicio de interés y descripción del proyecto.
      </p>
    </main>
  );
}
