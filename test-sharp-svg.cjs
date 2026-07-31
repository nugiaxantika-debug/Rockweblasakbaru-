const sharp = require('sharp');
const fs = require('fs');

async function test() {
    const svg = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white"/>
      <text x="50%" y="50%" font-size="80" font-family="sans-serif" font-weight="bold" fill="black" text-anchor="middle" dominant-baseline="middle">Hello Brat</text>
    </svg>`;
    try {
        const buffer = await sharp(Buffer.from(svg)).webp().toBuffer();
        fs.writeFileSync('test-sharp-svg.webp', buffer);
        console.log("Success SVG");
    } catch (e) {
        console.error(e);
    }
}
test();
