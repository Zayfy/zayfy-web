// Genera los assets de marca con transparencia a partir de los originales de design/brand/.
// Uso: node scripts/process-brand-assets.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = "design/brand/";
const OUT = "public/brand/";
mkdirSync(OUT, { recursive: true });

// Convierte "fondo oscuro" en transparencia: el brillo del píxel pasa a ser su alfa.
// Sobre un fondo oscuro se ve igual que el original, pero sin el recuadro.
async function blackToAlpha(img, { threshold = 0, circle = 0 } = {}) {
  const { data, info } = await img.removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const out = Buffer.alloc(w * h * 4);
  const cx = w / 2;
  const cy = h / 2;
  for (let i = 0, p = 0; i < w * h; i++, p += 3) {
    const x = i % w;
    const y = (i / w) | 0;
    const r = data[p];
    const g = data[p + 1];
    const b = data[p + 2];
    const m = Math.max(r, g, b);
    let a = Math.max(0, Math.min(1, (m - threshold) / (255 - threshold)));
    if (circle) {
      const d = Math.hypot(x - cx, y - cy) / (w / 2);
      const edge = Math.max(0, Math.min(1, (circle - d) / 0.03));
      a *= edge;
    }
    const k = a > 0 ? (255 - threshold) / Math.max(1, m - threshold) : 0;
    out[i * 4] = Math.min(255, Math.round(r * k));
    out[i * 4 + 1] = Math.min(255, Math.round(g * k));
    out[i * 4 + 2] = Math.min(255, Math.round(b * k));
    out[i * 4 + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width: w, height: h, channels: 4 } });
}

async function trimToContent(img, pad = 0, alphaMin = 12) {
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  let x0 = w, y0 = h, x1 = 0, y1 = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > alphaMin) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  x0 = Math.max(0, x0 - pad);
  y0 = Math.max(0, y0 - pad);
  x1 = Math.min(w - 1, x1 + pad);
  y1 = Math.min(h - 1, y1 + pad);
  return sharp(data, { raw: { width: w, height: h, channels: 4 } }).extract({
    left: x0,
    top: y0,
    width: x1 - x0 + 1,
    height: y1 - y0 + 1,
  });
}

async function save(img, name, opts = { lossless: true }) {
  const info = await img.webp(opts).toFile(OUT + name);
  console.log(name.padEnd(22), `${info.width}x${info.height}`, `${(info.size / 1024).toFixed(0)} KB`);
}

// 1) Logotipo completo (Z cinta + "ayfy" + punto), recortado del banner
{
  const crop = sharp(SRC + "original-banner-logo.webp").extract({ left: 1320, top: 215, width: 580, height: 185 });
  const alpha = await blackToAlpha(crop, { threshold: 34 });
  await save(await trimToContent(alpha, 6), "zayfy-logo.webp");
}

// 2) Z aislada (isotipo)
{
  const alpha = await blackToAlpha(sharp(SRC + "original-z-aislada.webp"), { threshold: 10 });
  const trimmed = await trimToContent(alpha, 10);
  await save(trimmed.resize({ width: 900, withoutEnlargement: true }), "zayfy-z.webp");
}

// 3) Símbolo con anillo (transparente, para el hero)
{
  const alpha = await blackToAlpha(sharp(SRC + "original-simbolo-anillo.webp"), { threshold: 24, circle: 0.99 });
  await save(alpha.resize({ width: 1000 }), "zayfy-symbol.webp");
}

// 4) Arte del hero (planeta + ondas de puntos), sin el logo, espejado
{
  const crop = sharp(SRC + "original-banner-logo.webp").extract({ left: 0, top: 0, width: 1240, height: 745 });
  const alpha = await blackToAlpha(crop, { threshold: 14 });
  await save(alpha.flop(), "hero-art.webp", { quality: 88, alphaQuality: 95 });
}

// 5) Iconos de la app
{
  const base = sharp(SRC + "original-simbolo-anillo.webp");
  const { width: W } = await base.metadata();

  // Favicon redondo: se recorta al círculo del anillo y las esquinas quedan transparentes
  const side = Math.round(W * 0.97);
  const offset = Math.round((W - side) / 2);
  const size = 512;
  const circle = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  );
  await base
    .clone()
    .extract({ left: offset, top: offset, width: side, height: side })
    .resize(size, size)
    .ensureAlpha()
    .composite([{ input: circle, blend: "dest-in" }])
    .png()
    .toFile("src/app/icon.png");

  // Icono de Apple: cuadrado a sangre (iOS aplica sus propias esquinas)
  await base.clone().resize(180, 180).png().toFile("src/app/apple-icon.png");
  console.log("icon.png (redondo) / apple-icon.png");
}
