const sharp = require('sharp');
const TextToSVG = require('text-to-svg');
const axios = require('axios');
const fs = require('fs');

async function getValidFontPath() {
    let fontPath = '/tmp/test_brat_font_valid.ttf';
    if (!fs.existsSync(fontPath)) {
        const url = 'https://raw.githubusercontent.com/googlefonts/montserrat/master/fonts/ttf/Montserrat-Bold.ttf';
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(fontPath, res.data);
    }
    return fontPath;
}

async function testLogo(text) {
    const fontPath = await getValidFontPath();
    const textToSVG = TextToSVG.loadSync(fontPath);
    
    const fontOptions = { fontSize: 100, anchor: 'center middle', attributes: { fill: 'url(#grad)', stroke: 'white', 'stroke-width': 2 } };
    let svgPaths = textToSVG.getPath(text.trim(), { ...fontOptions, x: 256, y: 256 });
    
    const svgLogo = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ff00cc;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333399;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      ${svgPaths}
    </svg>`;
    
    const imageBuffer = await sharp(Buffer.from(svgLogo)).jpeg({ quality: 90 }).toBuffer();
    console.log("Logo size:", imageBuffer.length);
}

testLogo("Keren").catch(console.error);
