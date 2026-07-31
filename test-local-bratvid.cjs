const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const sharp = require('sharp');

async function getValidFontPath() {
    let fontPath = path.join(process.cwd(), 'public', 'templates', 'brat_font.ttf');
    let isValid = false;
    if (fs.existsSync(fontPath)) {
        try {
            const TextToSVG = require('text-to-svg');
            TextToSVG.loadSync(fontPath);
            isValid = true;
        } catch (e) {}
    }
    if (!isValid) {
        fontPath = path.join(os.tmpdir(), 'brat_font_valid.ttf');
        if (fs.existsSync(fontPath)) {
            try {
                const TextToSVG = require('text-to-svg');
                TextToSVG.loadSync(fontPath);
                return fontPath;
            } catch(e) {}
        }
        const axios = require('axios');
        const url = 'https://github.com/google/fonts/raw/main/ofl/montserrat/Montserrat-Bold.ttf';
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(fontPath, res.data);
    }
    return fontPath;
}

function generateBratSVG(textToSVG, text, width = 512, height = 512) {
    const lines = [];
    const words = text.split(' ');
    let currentLine = '';
    const fontSize = 60;
    const padding = 40;
    const maxLineWidth = width - (padding * 2);

    for (let word of words) {
        let testLine = currentLine ? currentLine + ' ' + word : word;
        let metrics = textToSVG.getMetrics(testLine, { fontSize });
        if (metrics.width > maxLineWidth && currentLine !== '') {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = fontSize * 1.2;
    const totalTextHeight = lines.length * lineHeight;
    let startY = (height - totalTextHeight) / 2 + (fontSize / 2);

    const fontOptions = { fontSize, anchor: 'center middle', attributes: { fill: 'black' } };
    let svgPaths = '';

    for (let i = 0; i < lines.length; i++) {
        svgPaths += textToSVG.getPath(lines[i], { ...fontOptions, x: width / 2, y: startY + (i * lineHeight) });
    }

    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="white"/>${svgPaths}</svg>`;
}

async function generateBratVid(text) {
    const fontPath = await getValidFontPath();
    const TextToSVG = require('text-to-svg');
    const textToSVG = TextToSVG.loadSync(fontPath);
    
    const words = text.split(' ');
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bratvid-'));
    
    let currentText = "";
    for (let i = 0; i < words.length; i++) {
        currentText += (i === 0 ? "" : " ") + words[i];
        const svg = generateBratSVG(textToSVG, currentText);
        const buf = await sharp(Buffer.from(svg)).png().toBuffer();
        const frameNum = String(i + 1).padStart(3, '0');
        fs.writeFileSync(path.join(tmpDir, `frame_${frameNum}.png`), buf);
        
        // hold the last frame longer
        if (i === words.length - 1) {
            for(let j=1; j<=5; j++) {
                const extraFrameNum = String(i + 1 + j).padStart(3, '0');
                fs.writeFileSync(path.join(tmpDir, `frame_${extraFrameNum}.png`), buf);
            }
        }
    }
    
    const outputWebp = path.join(tmpDir, 'out.webp');
    const ffmpegPath = require('ffmpeg-static');
    
    // Create animated webp using ffmpeg
    execSync(`"${ffmpegPath}" -framerate 4 -i "${path.join(tmpDir, 'frame_%03d.png')}" -vcodec libwebp -lossless 0 -q:v 50 -loop 0 -preset default -an -vsync 0 -s 512:512 "${outputWebp}"`);
    
    const result = fs.readFileSync(outputWebp);
    // Cleanup
    fs.rmSync(tmpDir, { recursive: true, force: true });
    
    return result;
}

generateBratVid("Halo ini percobaan brat video yang sangat keren").then(buf => {
    console.log("Success, size:", buf.length);
}).catch(console.error);

