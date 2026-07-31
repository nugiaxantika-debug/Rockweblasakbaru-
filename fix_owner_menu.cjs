const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

code = code.replace(
    /let msgObj: any = \{ text: ownerText \};\s*if \(this\.coverImageBuffer\) msgObj = \{ image: this\.coverImageBuffer, caption: ownerText \};\s*await this\.sock\.sendMessage\(jid, msgObj, \{ quoted: msg \}\);/g,
    'let msgObj: any = { text: ownerText, contextInfo: this.getMenuContextInfo() };\n      if (this.coverImageBuffer) msgObj = { image: this.coverImageBuffer, caption: ownerText, contextInfo: this.getMenuContextInfo() };\n      await this.sock.sendMessage(jid, msgObj, { quoted: this.getFakeMenuQuote(senderJid, pushName) });'
);

fs.writeFileSync('src/services/whatsapp.ts', code);
