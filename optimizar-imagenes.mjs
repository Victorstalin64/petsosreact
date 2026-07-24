import sharp from "sharp";
import { readdirSync } from "fs";
import path from "path";

const carpeta = "./src/assets/images";
const archivos = readdirSync(carpeta).filter(f => /\.(png|jpe?g)$/i.test(f));

for (const archivo of archivos) {
  const entrada = path.join(carpeta, archivo);
  const salida = path.join(carpeta, archivo.replace(/\.(png|jpe?g)$/i, ".webp"));
  await sharp(entrada)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(salida);
  console.log(`${archivo} -> ${path.basename(salida)}`);
}