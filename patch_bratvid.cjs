const fs = require('fs');

let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

const generateBratVidMethod = `
    private async generateLocalBratVid(text: string): Promise<Buffer> {
        const fs = await import('fs');
        const path = await import('path');
        const os = await import('os');
        const { execSync } = await import('child_process');
        const sharp = (await import('sharp')).default;
        
        const fontPath = await this.getValidFontPath();
        const TextToSVG = (await import('text-to-svg')).default;
        const textToSVG = TextToSVG.loadSync(fontPath);
        
        const words = text.split(' ');
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bratvid-'));
        
        let currentText = "";
        for (let i = 0; i < words.length; i++) {
            currentText += (i === 0 ? "" : " ") + words[i];
            
            // Generate SVG logic
            const width = 512, height = 512;
            const lines = [];
            const subwords = currentText.split(' ');
            let currentLine = '';
            const fontSize = 60;
            const padding = 40;
            const maxLineWidth = width - (padding * 2);

            for (let word of subwords) {
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

            const fontOptions = { fontSize, anchor: 'center middle' as const, attributes: { fill: 'black' } };
            let svgPaths = '';

            for (let k = 0; k < lines.length; k++) {
                svgPaths += textToSVG.getPath(lines[k], { ...fontOptions, x: width / 2, y: startY + (k * lineHeight) });
            }

            const svg = \`<svg width="\${width}" height="\${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="white"/>\${svgPaths}</svg>\`;
            const buf = await sharp(Buffer.from(svg)).png().toBuffer();
            
            const frameNum = String(i + 1).padStart(3, '0');
            fs.writeFileSync(path.join(tmpDir, \`frame_\${frameNum}.png\`), buf);
            
            if (i === words.length - 1) {
                for(let j=1; j<=5; j++) {
                    const extraFrameNum = String(i + 1 + j).padStart(3, '0');
                    fs.writeFileSync(path.join(tmpDir, \`frame_\${extraFrameNum}.png\`), buf);
                }
            }
        }
        
        const outputWebp = path.join(tmpDir, 'out.webp');
        const ffmpegPath = (await import('ffmpeg-static')).default;
        
        execSync(\`"\${ffmpegPath}" -framerate 4 -i "\${path.join(tmpDir, 'frame_%03d.png')}" -vcodec libwebp -lossless 0 -q:v 50 -loop 0 -preset default -an -vsync 0 -s 512:512 "\${outputWebp}"\`);
        
        const result = fs.readFileSync(outputWebp);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        
        return result;
    }
`;

code = code.replace(/private async getValidFontPath\(\)/, match => generateBratVidMethod.trim() + '\n\n    ' + match);

// Replace bratvid command body
const oldBratVidRegex = /const \{ bratvid \} = await import\('brat-farel'\);\s*const videoBuffer = await bratvid\(text\);\s*\/\/[^\n]*\s*\/\/[^\n]*\s*\/\/[^\n]*\s*const tempInput = path\.join\(os\.tmpdir\(\), 'bratvid_in_' \+ Date\.now\(\) \+ '\.mp4'\);\s*const tempOutput = path\.join\(os\.tmpdir\(\), 'bratvid_out_' \+ Date\.now\(\) \+ '\.webp'\);\s*fs\.writeFileSync\(tempInput, videoBuffer\);\s*execSync\([^;]+\);\s*const stickerBuffer = fs\.readFileSync\(tempOutput\);\s*await this\.sock\.sendMessage\(jid, \{ sticker: stickerBuffer \}, \{ quoted: msg \}\);\s*fs\.unlinkSync\(tempInput\);\s*fs\.unlinkSync\(tempOutput\);/g;

code = code.replace(oldBratVidRegex, `const stickerBuffer = await this.generateLocalBratVid(text);
           await this.sock.sendMessage(jid, { sticker: stickerBuffer }, { quoted: msg });`);

fs.writeFileSync('src/services/whatsapp.ts', code);
console.log("Bratvid patched!");
