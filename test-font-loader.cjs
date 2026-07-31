const fs = require('fs');

async function test() {
    let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');
    console.log("Has fontloader:", code.includes('getValidFontPath()'));
    console.log("Has nulis fix:", code.includes('width="1024" height="784"'));
}
test();
