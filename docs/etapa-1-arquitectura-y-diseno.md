# Zayfy: Etapa 1 (arquitectura, diseño, componentes y stack)

> Beyond Code. Beyond Limits.

Base: prompt maestro de Zayfy + reglas de la skill `ui-ux-pro-max` (accesibilidad, rendimiento, movimiento, formularios).

---

## Resultado de ejecutar la skill (Python 3.12.10 instalado)

Se generó el sistema de diseño con el brief de Zayfy (variación 5, movimiento 5, densidad baja) y se hicieron búsquedas puntuales.

| Hallazgo de la skill | Decisión |
|---|---|
| Estilo recomendado: **Glassmorphism** | Coincide con la dirección de marca. Se adopta, con la condición de la skill: contraste de texto 4.5:1, foco visible y movimiento reducido. |
| Patrón: **Hero + valor + características + CTA** (CTA en el hero y al final) | Se adopta. La variante con testimonios o logos de clientes **se descarta** (no hay pruebas reales y el prompt lo prohíbe). La confianza se construye con principios y proceso. |
| Paleta (azul/naranja claro) y fuentes (Space Grotesk/DM Sans) | **Se descartan.** Son genéricas y chocan con la identidad. Prevalecen los colores oficiales y Sora/Inter. |
| "Evitar modo oscuro por defecto" | **No aplica**: el fondo oscuro es parte obligatoria de la marca. Se compensa verificando contraste de forma específica. |
| Animar máximo 1 o 2 elementos clave por vista; paralaje y partículas apagados con movimiento reducido | Se adopta como regla del hero y del sistema de movimiento. |
| Formulario: validar al salir del campo, resumen de errores enfocable con enlaces a cada campo, `role="alert"` | Se adopta tal cual en el formulario de contacto. |
| Next.js: Server Components por defecto, `dynamic()` para componentes pesados, evitar imports de barril | Se adopta (efectos del hero con carga diferida; iconos Lucide importados de forma puntual). |

---

## 0. Pendientes antes de la Etapa 2

| Pendiente | Por qué importa |
|---|---|
| **Archivo del logotipo original** (SVG o PNG con transparencia, en alta resolución) | La regla es no redibujarlo. Sin el archivo no puedo montar header, hero ni footer con la marca real. Además hay que extraer la **Z aislada** para favicon e isotipo. |
| Ilustraciones oficiales de los 4 servicios | El prompt las menciona como "piezas gráficas oficiales". Si no existen, uso composiciones propias en SVG/CSS con el mismo estilo. |
| Enlace de WhatsApp Business | Va como variable de entorno configurable. |
| URL de LinkedIn | Se oculta hasta que la entregues. |
| Servicio de correo para el formulario | Propongo Resend (o SMTP del dominio). Ver sección 6. |

Hasta recibir esto, el logotipo queda como un componente marcador con la misma proporción, para sustituirlo sin tocar el layout.

---

## 1. Arquitectura del sitio

**Una sola página principal (one-page) con anclas, más rutas legales.** Para una empresa nueva, sin casos de éxito ni cifras que mostrar, una página larga bien dirigida convierte mejor que un sitio de muchas páginas vacías.

```
/                      Home (todas las secciones)
/privacidad            Aviso de privacidad y tratamiento de datos
/gracias               Confirmación tras enviar el formulario (medición de conversiones)
/en/...                Reservado para inglés (Etapa 3+)
/sitemap.xml  /robots.txt  /opengraph-image
```

**Orden de secciones y propósito de conversión**

| # | Sección | Anclas | Objetivo | CTA primario |
|---|---|---|---|---|
| A | Header | n/a | Orientar y ofrecer contacto siempre visible | Hablemos de tu proyecto |
| B | Hero | `#inicio` | Que se entienda qué hace Zayfy en 5 segundos | Explorar servicios / Hablemos |
| C | Servicios | `#servicios` | Comunicar las 4 líneas | CTA propio de cada servicio |
| D | Sobre Zayfy | `#nosotros` | Identidad y filosofía, sin cifras inventadas | n/a |
| E | ¿Por qué Zayfy? | n/a | 6 principios diferenciadores | n/a |
| F | Nuestro enfoque | `#enfoque` | Proceso en 4 etapas | Solicita una asesoría |
| G | Contacto | `#contacto` | Captar la solicitud | Enviar solicitud |
| H | Footer | n/a | Navegación, legal, contacto | n/a |

**Navegación:** Inicio · Servicios · Nosotros · Nuestro enfoque · Contacto + botón destacado. Se marca la sección activa con `IntersectionObserver`. En móvil, menú a pantalla completa con foco atrapado y cierre con Escape.

**"Conocer más" de cada servicio:** en esta etapa abre un panel (modal accesible) con detalle de capacidades y CTA, evitando páginas vacías. La estructura queda lista para convertirlo después en `/servicios/[slug]` sin rehacer nada (SEO a futuro).

---

## 2. Sistema de diseño

### 2.1 Dirección y diales
Estilo: **oscuro futurista premium con neón controlado, glassmorphism sutil y profundidad**.
Diales de la skill: variación **5/10** (equilibrado, con personalidad pero sin caos), movimiento **5/10** (scroll y stagger estándar; solo 1 o 2 elementos animados destacados por vista), densidad **baja** (mucho aire).

### 2.2 Color (tokens semánticos, nunca hex suelto en componentes)

| Token | Valor | Uso |
|---|---|---|
| `--bg-base` | `#050509` | Fondo principal |
| `--bg-raised` | `#080D25` | Secciones alternas, tarjetas |
| `--brand-cyan` | `#00DFFF` | Acento, enlaces, foco |
| `--brand-blue` | `#145BFF` | Gradiente, botones |
| `--brand-violet` | `#7835FF` | Gradiente, brillos |
| `--brand-magenta` | `#F02BEA` | Acento final, punto de marca |
| `--text-primary` | `#FFFFFF` | Títulos |
| `--text-secondary` | `rgba(255,255,255,.72)` | Párrafos (verificar ≥ 4.5:1) |
| `--border-glass` | `rgba(255,255,255,.10)` | Bordes de vidrio |

**Gradiente de marca:** `linear-gradient(110deg, cyan → blue → violet → magenta)`.

> **Actualizado con el logo real.** Colores muestreados del archivo original: cian `#00d5fd`, azul `#0084fd`, azul profundo `#0015fb`, violeta `#861eee`, magenta `#f10dfc`. Son más saturados que los valores de referencia de esta tabla y son los que usa el sitio (`src/app/globals.css`). El tablero de marca lista otros hex (`#0A0F1F`, `#00B4FF`, `#7C3AED`, `#EC4899`); no se usaron porque no coinciden con los píxeles del logotipo.

**Contraste calculado sobre `#050509`** (aproximado, se revalida con herramienta en Etapa 3):

| Color | Contraste | Conclusión |
|---|---|---|
| Blanco | ~20:1 | Texto libre |
| Cian `#00DFFF` | ~12:1 | Texto libre |
| Magenta `#F02BEA` | ~6:1 | Texto libre |
| Azul `#145BFF` | ~3.9:1 | **No** para texto normal. Solo texto grande (≥ 24 px), botones, bordes e iconos |
| Violeta `#7835FF` | ~3.6:1 | Igual que el azul |

Regla derivada: los enlaces y textos pequeños usan **cian o blanco**, nunca azul o violeta. Azul y violeta viven en gradientes, brillos y rellenos de botón con texto blanco en negrita.

### 2.3 Tipografía
- **Sora** (títulos) e **Inter** (cuerpo, UI), con `next/font`, autoalojadas, `display: swap`, solo pesos usados. Precarga solo de los dos pesos críticos del hero.
- Escala fluida con `clamp()`: H1 `clamp(2.5rem, 6vw, 5rem)`, H2 `clamp(2rem, 4vw, 3rem)`, H3 1.5rem, cuerpo 1rem (mínimo 16 px en móvil), interlineado 1.6, medida 60 a 75 caracteres.
- Títulos con `text-wrap: balance`. Peso 600 a 700 en Sora, 400 y 500 en Inter.

### 2.4 Espaciado, layout y capas
- Escala de 4/8 px. Secciones con 96 px verticales en escritorio y 64 px en móvil.
- Contenedor `max-w-7xl`. Breakpoints **375 / 768 / 1024 / 1440**. Mobile-first. `min-h-dvh` en lugar de `100vh`.
- Capas z: `0 fondo · 10 contenido · 20 tarjetas elevadas · 40 header · 100 menú móvil · 1000 modal/toast`.
- Elevación en 3 niveles; radios 12 / 20 / 28 px.

### 2.5 Movimiento (tokens compartidos)
| Token | Valor | Uso |
|---|---|---|
| `--dur-fast` | 150 ms | hover, foco, pulsación |
| `--dur-base` | 300 ms | estados, tarjetas |
| `--dur-slow` | 600 ms | entradas por scroll |
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` | llegada |
| stagger | 40 ms por elemento | listas y rejillas |

Reglas: animar solo `transform` y `opacity`; salidas ~65 % de la entrada; nada bloquea la interacción; todo interrumpible; **`prefers-reduced-motion` desactiva parallax, partículas y 3D, y deja el contenido visible de inmediato**. En móvil se recortan partículas y efectos pesados.

### 2.6 Componentes de efecto de marca
- **Vidrio:** `backdrop-blur` + fondo translúcido + borde `--border-glass`. Solo en header, tarjetas y panel del formulario (el blur no se usa como decoración suelta).
- **Brillo neón:** `box-shadow` y `radial-gradient` en hover, con intensidad baja.
- **Botón primario:** relleno con gradiente animado en hover (desplazamiento de `background-position`, sin reflow). **Un solo CTA primario por vista.** Secundario: contorno de vidrio.
- Iconos: **Lucide**, un solo trazo (1.5 px) y tamaños por token (16/20/24/32). Sin emojis.

---

## 3. Experiencia visual de la página principal

**Hero (la pieza más cuidada)**
- Fondo `#050509` con un **horizonte planetario luminoso** en la parte inferior (arco con degradado cian → violeta → magenta y atmósfera difusa), y **líneas orbitales** finas que giran muy lento.
- Centro/derecha: el **logotipo** como pieza protagonista, con halo suave y ligera inclinación según el puntero (solo escritorio).
- Texto a la izquierda: etiqueta pequeña `Medellín · Colombia`, H1 **"Hello, World. We are Zayfy."**, subtítulo con el eslogan "Beyond Code. Beyond Limits." en gradiente, párrafo de apoyo, y dos botones (Explorar servicios, Hablemos de tu proyecto).
- Partículas discretas: canvas 2D ligero (≈ 40 a 60 puntos en escritorio, 0 en móvil o con movimiento reducido).
- **3D:** el hero **no necesita Three.js** para verse premium; se logra con CSS/SVG y capas con parallax. React Three Fiber queda como mejora opcional y diferida (ver 5).
- Rendimiento: el elemento LCP es el texto H1, no una imagen. Fondos como SVG/CSS. Reservar dimensiones para evitar CLS.

**Servicios:** rejilla 2×2 (1 columna en móvil). Cada tarjeta de vidrio con ilustración propia, nombre, descripción corta, 4 capacidades con icono, "Conocer más" y CTA de asesoría. Hover: leve elevación y borde con gradiente. Cada servicio tiene un acento ligeramente distinto dentro de la paleta para distinguirlos sin romper la identidad (Cloud: cian, DevOps: azul, Software: violeta, IA: magenta).

**Sobre Zayfy:** bloque editorial centrado con el texto de filosofía, cierre "Construimos nuevas posibilidades." en gradiente. Sin cifras, años ni clientes.

**¿Por qué Zayfy?:** 6 tarjetas pequeñas con icono y microinteracción (el icono "enciende" su gradiente al hover/foco).

**Nuestro enfoque:** línea de tiempo horizontal en escritorio y vertical en móvil, con 4 hitos (Descubrimos, Diseñamos, Construimos, Evolucionamos). La línea se dibuja con el scroll y cada hito es operable por teclado. Alternativa estática si hay movimiento reducido.

**Contacto:** panel de vidrio con el formulario a un lado y los datos (correo, WhatsApp, Medellín, LinkedIn si existe) al otro.

**Formulario (reglas de la skill):** etiquetas siempre visibles, campos obligatorios marcados, validación al salir del campo, error específico bajo cada campo con `aria-describedby`, resumen de errores enfocable tras un envío fallido, botón con estado de carga, mensaje de éxito sin robar el foco, `autocomplete` correcto, `type="email"`, altura mínima de 44 px.

---

## 4. Estructura de componentes

```
zayfy-web/
├─ src/
│  ├─ app/
│  │  ├─ [locale]/            # es (por defecto) / en
│  │  │  ├─ layout.tsx        # fuentes, metadatos, JSON-LD
│  │  │  ├─ page.tsx          # compone las secciones
│  │  │  ├─ privacidad/page.tsx
│  │  │  └─ gracias/page.tsx
│  │  ├─ api/contact/route.ts # envío del formulario
│  │  ├─ sitemap.ts · robots.ts · opengraph-image.tsx
│  ├─ components/
│  │  ├─ ui/        Button, Card, GlassPanel, GradientText, Badge, Modal, Field, Input, Textarea, Select, Toast
│  │  ├─ layout/    Header, MobileMenu, Footer, Container, Section, SkipLink
│  │  ├─ brand/     Logo, LogoMark (Z aislada)
│  │  ├─ sections/  Hero, Services, ServiceCard, ServiceModal, About, WhyZayfy, Process, Contact, ContactForm
│  │  ├─ effects/   ParticleField, OrbitalLines, PlanetHorizon, GlowCursor, Reveal
│  ├─ content/
│  │  ├─ es/ (servicios, principios, proceso, legal)  ← todo el texto editable
│  │  └─ en/ (reservado)
│  ├─ lib/          env.ts (validación), schema.ts (zod), mail.ts, rate-limit.ts, analytics.ts
│  ├─ styles/       tokens.css, globals.css
│  └─ hooks/        useReducedMotion, useActiveSection, useMediaQuery
├─ public/          brand/ (logo, Z, og), services/ (ilustraciones)
├─ Dockerfile · docker-compose.yml · nginx/zay-fy.conf
├─ .github/workflows/ci.yml · deploy.yml
├─ .env.example
```

Criterios: los textos viven en `content/` (no en JSX) para traducir luego sin tocar componentes; Server Components por defecto y `"use client"` solo donde hay interacción (menú, formulario, efectos); efectos pesados con `dynamic import` y carga diferida bajo el pliegue.

---

## 5. Stack técnico definitivo

| Capa | Decisión | Motivo |
|---|---|---|
| Framework | **Next.js 16 (App Router) + TypeScript estricto** | SEO, Server Components por defecto, `output: "standalone"` para Docker. Requiere Node 20.9+ (tienes v20.15). La guía de la skill para Next 16.2 está verificada a agosto de 2026. |
| Estilos | **Tailwind CSS** con tokens en CSS variables | Sistema consistente y bundle pequeño |
| Animación | **Motion (Framer Motion)** | Entradas por scroll, layout, `useReducedMotion` |
| Iconos | **Lucide** | Pedido en el prompt; trazo consistente |
| i18n | **next-intl** | `es` por defecto, `en` listo para activar |
| Formulario | **React Hook Form + Zod** (mismo esquema en cliente y servidor) | Validación robusta |
| Envío | Route Handler + **Resend** (o SMTP) | Sin base de datos al inicio; CRM después |
| Anti-spam | **Honeypot + límite de peticiones por IP + Cloudflare Turnstile** (opcional) | Protección básica sin fricción |
| 3D | **Sin Three.js en v1.** React Three Fiber solo si, tras medir, el hero lo justifica; cargado diferido y desactivado en móvil o con movimiento reducido | Rendimiento primero |
| Calidad | ESLint, Prettier, Vitest, Playwright + axe | Pruebas y accesibilidad (Etapa 3) |
| Analítica | Capa `lib/analytics.ts` vacía (adaptador) | Preparada para GA4, Meta Pixel o Plausible sin acoplar |

---

## 6. Seguridad, SEO y despliegue (se implementa en Etapas 3 y 4)

- **Cabeceras HTTP:** CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors`.
- **Secretos:** solo en variables de entorno del VPS/GitHub Secrets; `.env.example` sin valores reales; validación con zod al arrancar.
- **SEO:** metadatos por sección, Open Graph e imagen social generada, `sitemap.xml`, `robots.txt`, JSON-LD (`Organization` y `ProfessionalService`, con Medellín), `hreflang` listo, textos naturales sin relleno de palabras clave. Un H1 por página y jerarquía correcta.
- **Accesibilidad (WCAG 2.2 AA):** enlace "saltar al contenido", foco visible, foco no tapado por el header fijo, orden de tabulación lógico, `aria-label` en iconos sin texto, iconos decorativos con `aria-hidden`, carruseles inexistentes (sin movimiento automático que pausar), movimiento reducido.
- **Despliegue previsto:** Dockerfile multi-etapa (build → runner no root) · GitHub Actions: lint, tipos, pruebas, build de imagen a GHCR, despliegue por SSH al VPS Ubuntu 24.04 · Nginx como proxy inverso con TLS (Certbot/Let's Encrypt), compresión y caché de estáticos · `docker compose` con healthcheck. No se asume nada preconfigurado en el VPS: se entrega una guía de preparación (usuario, firewall, Docker, Nginx, DNS de `zay-fy.com`).

---

## 7. Reglas de contenido (para no romper la marca)

- No inventar años de experiencia, clientes, certificaciones, alianzas, proyectos, testimonios, teléfonos, direcciones ni redes.
- No repetir el nombre junto al logotipo; no recolorear ni deformar el logo; la Z aislada solo como isotipo, favicon o decoración secundaria.
- Tono: cercano y sofisticado, sin jerga innecesaria ni promesas exageradas.

---

## 8. Siguiente paso (Etapa 2)

Crear el proyecto `zayfy-web` y construir: tokens y layout, Header, Hero, Servicios (con modal), Sobre Zayfy, ¿Por qué Zayfy?, Enfoque, Contacto (maqueta del formulario) y Footer, todo responsive y con las animaciones optimizadas. Necesito antes el **logotipo original** y decidir **dónde vive el proyecto** en tu equipo.
