const fs = require('fs');

let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

const regex1 = /const fs = require\('fs'\);/g;
const regex2 = /const path = require\('path'\);/g;
const regex3 = /const os = require\('os'\);/g;
const regex4 = /const ffmpegPath = require\('ffmpeg-static'\);/g;
const regex5 = /const \{ execSync \} = require\('child_process'\);/g;

code = code.replace(regex1, '');
code = code.replace(regex2, '');
code = code.replace(regex3, '');
code = code.replace(regex4, '');
code = code.replace(regex5, '');

fs.writeFileSync('src/services/whatsapp.ts', code);
console.log("Patched require inside ESM!");
