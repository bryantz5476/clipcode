import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../client/public');

const galleryImages = ['ecommerce.webp', 'clinica.webp', 'iphone17.webp', 'macbarber.webp'];
const sizes = [
  { suffix: '-sm', width: 480 },
  { suffix: '-md', width: 960 },
];

for (const img of galleryImages) {
  const input = path.join(publicDir, img);

  if (!fs.existsSync(input)) {
    console.warn(`Skipping ${img} (not found)`);
    continue;
  }

  const meta = await sharp(input).metadata();
  const base = img.replace('.webp', '');

  for (const { suffix, width } of sizes) {
    const output = path.join(publicDir, `${base}${suffix}.webp`);
    if (meta.width && meta.width <= width) {
      console.log(`  Skipping ${base}${suffix}.webp (original ${meta.width}px <= ${width}px)`);
      continue;
    }
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(output);
    console.log(`  Generated ${base}${suffix}.webp (${width}px)`);
  }
}

console.log('Responsive images ready.');
