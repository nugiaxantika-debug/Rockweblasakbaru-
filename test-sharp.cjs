const sharp = require('sharp');
const svg = `<svg width="512" height="512"><rect width="100%" height="100%" fill="red"/></svg>`;
sharp(Buffer.from(svg)).webp({quality: 80}).toBuffer().then(b => console.log("OK")).catch(e => console.error(e));
