const fs = require('fs');
const content = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

const lines = content.split('\n');
const start = 3734;
const end = 3746;
const newLines = `    } else if (body.startsWith(".bratvid ") || body === ".bratvid" || body.startsWith("bratvid ") || body === "bratvid") {
       let text = messageContent.replace(/^\\.?bratvid\\s*/i, "").trim() || "Brat";
       try {
           await this.sock.sendMessage(jid, { text: "⏳ *Membuat stiker video brat...*" }, { quoted: msg });
           
           const stickerBuffer = await this.generateLocalBratVid(text);
           await this.sock.sendMessage(jid, { sticker: stickerBuffer }, { quoted: msg });
       } catch (e: any) {
           console.error("Bratvid error:", e);
           await this.sock.sendMessage(jid, { text: \`❌ Gagal membuat stiker brat video: \${e.message || e}\` }, { quoted: msg });
       }`.split('\n');

const newContent = [...lines.slice(0, start), ...newLines, ...lines.slice(end)].join('\n');
fs.writeFileSync('src/services/whatsapp.ts', newContent);
