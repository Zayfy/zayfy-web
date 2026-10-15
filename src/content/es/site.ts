import {
  Activity,
  Bot,
  BrainCircuit,
  Boxes,
  Cloud,
  CodeXml,
  Cpu,
  Gauge,
  InfinityIcon,
  Layers,
  LifeBuoy,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "Zayfy",
  tagline: "Beyond Code. Beyond Limits.",
  email: "connect@zay-fy.com",
  location: "Medellín, Colombia",
  url: "https://zay-fy.com",
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
};

export const nav = [
  { label: "Inicio", href: "#inicio", id: "inicio" },
  { label: "Servicios", href: "#servicios", id: "servicios" },
  { label: "Nosotros", href: "#nosotros", id: "nosotros" },
  { label: "Nuestro enfoque", href: "#enfoque", id: "enfoque" },
  { label: "Contacto", href: "#contacto", id: "contacto" },
];

export const hero = {
  eyebrow: "Medellín · Colombia · Alcance internacional",
  title: "Hello, World. We are Zayfy.",
  slogan: "Beyond Code. Beyond Limits.",
  text: "Transformamos ideas y desafíos tecnológicos en soluciones digitales innovadoras, seguras y escalables.",
};

export type Service = {
  id: string;
  name: string;
  concept: string;
  description: string;
  value: string;
  cta: string;
  accent: string;
  icon: LucideIcon;
  highlights: { icon: LucideIcon; label: string }[];
  capabilities: string[];
};

export const services: Service[] = [
  {
    id: "cloud-rescue",
    name: "Cloud Rescue",
    concept: "Recuperamos, estabilizamos y optimizamos infraestructuras Cloud.",
    description:
      "¿Tu infraestructura presenta fallas, costos elevados o problemas de rendimiento? Diagnosticamos, recuperamos y optimizamos entornos Cloud, mejorando la seguridad, estabilidad y eficiencia de tus aplicaciones.",
    value: "Transformamos problemas tecnológicos en soluciones confiables y escalables.",
    cta: "Optimiza tu infraestructura",
    accent: "#00d5fd",
    icon: Cloud,
    highlights: [
      { icon: Activity, label: "Diagnóstico de infraestructura" },
      { icon: Gauge, label: "Mejoras de rendimiento" },
      { icon: ShieldCheck, label: "Seguridad y buenas prácticas" },
      { icon: Cloud, label: "Optimización de costos" },
    ],
    capabilities: [
      "Diagnóstico de infraestructura Cloud",
      "Identificación de fallas y cuellos de botella",
      "Recuperación y estabilización de entornos",
      "Optimización de costos",
      "Mejoras de rendimiento",
      "Seguridad y buenas prácticas",
      "Alta disponibilidad y confiabilidad",
      "Modernización de infraestructura",
    ],
  },
  {
    id: "devops-partner",
    name: "DevOps Partner",
    concept:
      "Un aliado especializado para automatizar, optimizar y evolucionar operaciones tecnológicas.",
    description:
      "Impulsa tu operación tecnológica con un aliado DevOps especializado. Automatizamos despliegues, implementamos CI/CD, monitoreo, contenedores y soluciones de infraestructura para mejorar la eficiencia y continuidad de tus sistemas.",
    value: "Tu tecnología evoluciona, nosotros la impulsamos.",
    cta: "Acelera tus despliegues",
    accent: "#0084fd",
    icon: InfinityIcon,
    highlights: [
      { icon: Rocket, label: "CI/CD y despliegues automáticos" },
      { icon: Layers, label: "Infraestructura como código" },
      { icon: Boxes, label: "Contenedores" },
      { icon: Activity, label: "Monitoreo y observabilidad" },
    ],
    capabilities: [
      "Implementación de CI/CD",
      "Automatización de despliegues",
      "Infraestructura como código (IaC)",
      "Contenedores",
      "Monitoreo y observabilidad",
      "Optimización de procesos",
      "Seguridad y confiabilidad",
      "Acompañamiento técnico y buenas prácticas",
    ],
  },
  {
    id: "software-development",
    name: "Software Development",
    concept: "Convertimos ideas en productos digitales funcionales, modernos y escalables.",
    description:
      "Convertimos tus ideas en soluciones digitales a medida. Diseñamos y desarrollamos aplicaciones web, plataformas empresariales, APIs y sistemas Full-Stack modernos, seguros y escalables, adaptados a los objetivos de tu negocio.",
    value: "De la idea a una solución tecnológica real.",
    cta: "Construyamos tu idea",
    accent: "#a23cff",
    icon: CodeXml,
    highlights: [
      { icon: CodeXml, label: "Aplicaciones web y Full-Stack" },
      { icon: Network, label: "APIs REST e integraciones" },
      { icon: Layers, label: "Arquitecturas escalables" },
      { icon: Sparkles, label: "Soluciones personalizadas" },
    ],
    capabilities: [
      "Desarrollo de aplicaciones web",
      "Plataformas empresariales",
      "Desarrollo Full-Stack",
      "APIs REST e integraciones",
      "Arquitecturas escalables",
      "Soluciones personalizadas",
      "Modernización de aplicaciones",
      "Diseño de soluciones digitales",
    ],
  },
  {
    id: "ai-automation",
    name: "AI & Automation",
    concept:
      "Automatización inteligente para empresas que quieren hacer más con menos esfuerzo operativo.",
    description:
      "Haz que tu negocio trabaje de forma más inteligente. Implementamos agentes de inteligencia artificial, chatbots, integraciones y automatizaciones que reducen tareas repetitivas, optimizan procesos y mejoran la experiencia de tus clientes.",
    value: "Menos procesos manuales, más innovación y productividad.",
    cta: "Automatiza tu negocio",
    accent: "#f10dfc",
    icon: BrainCircuit,
    highlights: [
      { icon: Bot, label: "Agentes de inteligencia artificial" },
      { icon: Sparkles, label: "Chatbots y asistentes" },
      { icon: Workflow, label: "Flujos de trabajo automatizados" },
      { icon: Cpu, label: "Procesamiento inteligente de datos" },
    ],
    capabilities: [
      "Agentes de inteligencia artificial",
      "Chatbots y asistentes inteligentes",
      "Automatización de procesos empresariales",
      "Integración entre aplicaciones",
      "Flujos de trabajo automatizados",
      "Procesamiento inteligente de información",
      "Optimización de tareas repetitivas",
      "Soluciones de IA adaptadas al negocio",
    ],
  },
];

export const about = {
  title: "Más allá de lo convencional",
  paragraphs: [
    "En Zayfy creemos que la innovación comienza cuando nos atrevemos a ir más allá de lo convencional.",
    "Combinamos desarrollo de software, infraestructura Cloud, DevOps e inteligencia artificial para crear soluciones que respondan a desafíos reales y acompañen el crecimiento de las empresas.",
  ],
  closing: "No solo construimos tecnología. Construimos nuevas posibilidades.",
};

export const principles: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Sparkles,
    title: "Soluciones a la medida",
    text: "Cada negocio es distinto. Diseñamos la solución para el tuyo, no al revés.",
  },
  {
    icon: Layers,
    title: "Visión integral",
    text: "Software, infraestructura y automatización pensados como un solo sistema.",
  },
  {
    icon: ShieldCheck,
    title: "Escalabilidad y seguridad",
    text: "Bases sólidas para crecer sin sobresaltos y proteger lo que importa.",
  },
  {
    icon: Gauge,
    title: "Eficiencia tecnológica",
    text: "Optimizamos recursos, costos y tiempos para que tu tecnología rinda más.",
  },
  {
    icon: LifeBuoy,
    title: "Acompañamiento cercano",
    text: "Trabajamos contigo, con comunicación clara y sin tecnicismos innecesarios.",
  },
  {
    icon: Rocket,
    title: "Innovación con resultados",
    text: "Ideas ambiciosas aterrizadas en entregables que funcionan.",
  },
];

export const approach = [
  { title: "Descubrimos", text: "Entendemos el desafío y las necesidades de tu negocio." },
  { title: "Diseñamos", text: "Definimos una solución tecnológica adecuada y un plan claro." },
  { title: "Construimos", text: "Implementamos y validamos de forma iterativa." },
  { title: "Evolucionamos", text: "Optimizamos y acompañamos el crecimiento de la solución." },
];

export const contact = {
  title: "Tu próxima gran idea comienza aquí.",
  text: "Cuéntanos qué necesitas. En Zayfy te ayudamos a encontrar la solución tecnológica adecuada para tu negocio.",
};
