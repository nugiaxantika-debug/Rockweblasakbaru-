const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'src/services/whatsapp.ts');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /(\s*if \(!msgText\.includes\(`@\$\{participantJid\.split\("@"\)\[0\]\}`\)\) \{\s*msgText \+= `\\n\\nSelamat datang @\$\{participantJid\.split\("@"\)\[0\]\}!`;\s*\})\s*await this\.sock\.sendMessage\(id, \{ text: msgText, mentions: \[participantJid\] \}\);\s*this\.broadcastState\(`Sent welcome message to \$\{participantJid\}`\);/g,
  `$1\n                if (this.coverImageBuffer) {\n                    await this.sock.sendMessage(id, { image: this.coverImageBuffer, caption: msgText, mentions: [participantJid] });\n                } else {\n                    await this.sock.sendMessage(id, { text: msgText, mentions: [participantJid] });\n                }\n                this.broadcastState(\`Sent welcome message to \${participantJid}\`);`
);

content = content.replace(
  /(\s*if \(!msgText\.includes\(`@\$\{participantJid\.split\("@"\)\[0\]\}`\)\) \{\s*msgText \+= `\\n\\nSelamat tinggal @\$\{participantJid\.split\("@"\)\[0\]\}!`;\s*\})\s*await this\.sock\.sendMessage\(id, \{ text: msgText, mentions: \[participantJid\] \}\);\s*this\.broadcastState\(`Sent goodbye message to \$\{participantJid\}`\);/g,
  `$1\n                if (this.coverImageBuffer) {\n                    await this.sock.sendMessage(id, { image: this.coverImageBuffer, caption: msgText, mentions: [participantJid] });\n                } else {\n                    await this.sock.sendMessage(id, { text: msgText, mentions: [participantJid] });\n                }\n                this.broadcastState(\`Sent goodbye message to \${participantJid}\`);`
);

content = content.replace(
  /(\s*if \(!msgText\.includes\(`@\$\{participantJid\.split\("@"\)\[0\]\}`\)\) \{\s*msgText \+= `\\n\\nSelamat datang @\$\{participantJid\.split\("@"\)\[0\]\}!`;\s*\})\s*await this\.sock\.sendMessage\(jid, \{ text: msgText, mentions: \[participantJid\] \}\);\s*this\.broadcastState\(`Fallback sent welcome to \$\{participantJid\}`\);/g,
  `$1\n              if (this.coverImageBuffer) {\n                  await this.sock.sendMessage(jid, { image: this.coverImageBuffer, caption: msgText, mentions: [participantJid] });\n              } else {\n                  await this.sock.sendMessage(jid, { text: msgText, mentions: [participantJid] });\n              }\n              this.broadcastState(\`Fallback sent welcome to \${participantJid}\`);`
);

content = content.replace(
  /(\s*if \(!msgText\.includes\(`@\$\{participantJid\.split\("@"\)\[0\]\}`\)\) \{\s*msgText \+= `\\n\\nSelamat tinggal @\$\{participantJid\.split\("@"\)\[0\]\}!`;\s*\})\s*await this\.sock\.sendMessage\(jid, \{ text: msgText, mentions: \[participantJid\] \}\);\s*this\.broadcastState\(`Fallback sent goodbye to \$\{participantJid\}`\);/g,
  `$1\n              if (this.coverImageBuffer) {\n                  await this.sock.sendMessage(jid, { image: this.coverImageBuffer, caption: msgText, mentions: [participantJid] });\n              } else {\n                  await this.sock.sendMessage(jid, { text: msgText, mentions: [participantJid] });\n              }\n              this.broadcastState(\`Fallback sent goodbye to \${participantJid}\`);`
);

fs.writeFileSync(file, content);
console.log('done');
