import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { site } from "@/content/es/site";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Zayfy | Beyond Code. Beyond Limits.",
    template: "%s | Zayfy",
  },
  description:
    "Zayfy es una empresa tecnológica colombiana: desarrollo de software a medida, soluciones Cloud, DevOps e inteligencia artificial para empresas.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: site.url,
    siteName: "Zayfy",
    title: "Zayfy | Beyond Code. Beyond Limits.",
    description:
      "Software a medida, Cloud, DevOps e inteligencia artificial para empresas que quieren ir más allá.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050509",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-black"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
