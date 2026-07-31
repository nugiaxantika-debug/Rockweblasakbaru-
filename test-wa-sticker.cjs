const { Sticker } = require('wa-sticker-formatter');
const fs = require('fs');

async function test() {
    const svg = `<svg width="512" height="512"><rect width="100%" height="100%" fill="red"/></svg>`;
    try {
        const sticker = new Sticker(Buffer.from(svg), { pack: 'a', author: 'b', type: 'full' });
        const buf = await sticker.toBuffer();
        console.log("OK");
    } catch (e) {
        console.error("Sticker error:", e.message);
    }
}
test();
