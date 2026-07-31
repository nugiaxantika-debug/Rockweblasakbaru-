const sharp = require('sharp');
const fs = require('fs');

async function test() {
    const bgPath = 'node_modules/nulis-buku/assets/buku1.jpg';
    const baseImageBuffer = await sharp(fs.readFileSync(bgPath)).jpeg().toBuffer();
    const svgText = `<svg width="1280" height="960" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="none"/></svg>`;
    
    try {
        const finalBuffer = await sharp(baseImageBuffer)
            .composite([{ input: Buffer.from(svgText), blend: 'over' }])
            .jpeg().toBuffer();
        console.log("OK");
    } catch(e) {
        console.error(e);
    }
}
test();
