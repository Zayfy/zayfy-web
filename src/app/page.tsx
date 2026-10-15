import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { WhyZayfy } from "@/components/sections/WhyZayfy";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        {/* Capa opaca: cubre a Contact, que queda pegado bajo ella hasta que se revela */}
        <div className="relative z-10 bg-bg-base shadow-[0_40px_80px_-10px_rgb(0_0_0/0.8)]">
          <Hero />
          <Services />
          <About />
          <WhyZayfy />
          <Process />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
