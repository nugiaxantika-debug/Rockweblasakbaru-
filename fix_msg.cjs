const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

// Fix allmenu
code = code.replace(
    /await this\.sock\.sendMessage\(jid, \{\s*image: this\.coverImageBuffer,\s*caption: menu,\s*contextInfo: this\.getMenuContextInfo\(\)\s*\}, \{ quoted: msg \}\);/g,
    'await this.sock.sendMessage(jid, { image: this.coverImageBuffer, caption: menu, contextInfo: this.getMenuContextInfo() }, { quoted: this.getFakeMenuQuote(senderJid, pushName) });'
);

code = code.replace(
    /await this\.sock\.sendMessage\(jid, \{\s*text: menu,\s*contextInfo: this\.getMenuContextInfo\(\)\s*\}, \{ quoted: msg \}\);/g,
    'await this.sock.sendMessage(jid, { text: menu, contextInfo: this.getMenuContextInfo() }, { quoted: this.getFakeMenuQuote(senderJid, pushName) });'
);

fs.writeFileSync('src/services/whatsapp.ts', code);
