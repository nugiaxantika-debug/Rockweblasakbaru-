const TextToSVG = require('text-to-svg');
try {
    const textToSVG = TextToSVG.loadSync('public/templates/brat_font.ttf');
    console.log("Loaded font:", textToSVG ? "Yes" : "No");
} catch(e) {
    console.error("TTS Error:", e);
}
