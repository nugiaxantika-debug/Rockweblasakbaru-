const fs = require('fs');

let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

// Fix 1: Add a font loader helper that ensures the font exists and is valid
const fontLoaderCode = `
    private async getValidFontPath(): Promise<string> {
        const os = await import('os');
        const path = await import('path');
        const fs = await import('fs');
        const axios = (await import('axios')).default;
        
        let fontPath = path.join(process.cwd(), 'public', 'templates', 'brat_font.ttf');
        let isValid = false;
        
        if (fs.existsSync(fontPath)) {
            try {
                const TextToSVG = (await import('text-to-svg')).default;
                TextToSVG.loadSync(fontPath);
                isValid = true;
            } catch (e) {
                console.error("Local font corrupted, will redownload");
            }
        }
        
        if (!isValid) {
            fontPath = path.join(os.tmpdir(), 'brat_font_valid.ttf');
            if (fs.existsSync(fontPath)) {
                try {
                    const TextToSVG = (await import('text-to-svg')).default;
                    TextToSVG.loadSync(fontPath);
                    return fontPath;
                } catch(e) {}
            }
            // Download it
            const url = 'https://github.com/google/fonts/raw/main/ofl/montserrat/Montserrat-Bold.ttf';
            const res = await axios.get(url, { responseType: 'arraybuffer' });
            fs.writeFileSync(fontPath, res.data);
        }
        return fontPath;
    }
`;

// Insert the method in WhatsAppBot class
code = code.replace(/private saveKaryawanData\(\) \{[\s\S]*?\n\s*\}/, match => match + '\n' + fontLoaderCode);

// Update nulis dimension
code = code.replace(/const svgText = \`<svg width="1280" height="960" xmlns="http:\/\/www.w3.org\/2000\/svg">\$\{svgPaths\}<\/svg>\`;/g, 'const svgText = `<svg width="1024" height="784" xmlns="http://www.w3.org/2000/svg">${svgPaths}</svg>`;');

// Update all references to brat_font.ttf to use getValidFontPath()
// .brat
code = code.replace(/const fontPath = path\.join\(process\.cwd\(\), 'public', 'templates', 'brat_font\.ttf'\);\s*const textToSVG = TextToSVG\.loadSync\(fontPath\);/g, 'const fontPath = await this.getValidFontPath();\n           const textToSVG = TextToSVG.loadSync(fontPath);');

fs.writeFileSync('src/services/whatsapp.ts', code);
console.log("Patched!");
