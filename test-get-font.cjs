const fs = require('fs');
const path = require('path');
const os = require('os');
const axios = require('axios');
const TextToSVG = require('text-to-svg');

async function getValidFontPath() {
    let fontPath = path.join(process.cwd(), 'public', 'templates', 'brat_font.ttf');
    let isValid = false;
    
    if (fs.existsSync(fontPath)) {
        try {
            TextToSVG.loadSync(fontPath);
            isValid = true;
        } catch (e) {
            console.error("Local font corrupted, will redownload");
            fs.unlinkSync(fontPath);
        }
    }
    
    if (!isValid) {
        fontPath = path.join(os.tmpdir(), 'brat_font_valid.ttf');
        if (fs.existsSync(fontPath)) {
            try {
                TextToSVG.loadSync(fontPath);
                return fontPath;
            } catch(e) {
                fs.unlinkSync(fontPath);
            }
        }
        // Download it
        const url = 'https://raw.githubusercontent.com/googlefonts/montserrat/master/fonts/ttf/Montserrat-Bold.ttf';
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(fontPath, res.data);
    }
    return fontPath;
}

getValidFontPath().then(f => console.log("Got font:", f)).catch(e => console.error(e));
