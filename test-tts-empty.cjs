const TextToSVG = require('text-to-svg');
const fs = require('fs');
fs.writeFileSync('empty.ttf', 'this is not a font');
try {
    const textToSVG = TextToSVG.loadSync('empty.ttf');
    console.log("Loaded font:", textToSVG ? "Yes" : "No");
} catch(e) {
    console.error("TTS Error:", e.message);
}
