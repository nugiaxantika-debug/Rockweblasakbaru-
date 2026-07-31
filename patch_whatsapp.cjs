const fs = require('fs');

let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

// 1. Add class properties
if (!code.includes('private textNama')) {
    code = code.replace('private customBotName: string | null = null;', 'private customBotName: string | null = null;\n  private textNama: string | null = "KYYINFINITE";');
}

// 2. Add loadBotSettings
if (!code.includes('if (obj.textNama !== undefined)')) {
    code = code.replace('if (obj.antibotEnabled !== undefined)', 'if (obj.textNama !== undefined) this.textNama = obj.textNama;\n      if (obj.antibotEnabled !== undefined)');
}

// 3. Add saveBotSettings
if (!code.includes('textNama: this.textNama,')) {
    code = code.replace('antibotEnabled: this.antibotEnabled,', 'textNama: this.textNama,\n      antibotEnabled: this.antibotEnabled,');
}

// 4. Add helper methods
if (!code.includes('private getFakeMenuQuote')) {
    const helpers = `
  private getFakeMenuQuote(sender: string, pushName: string) {
      const registeredUser = this.registeredUsers.get(sender);
      const displayName = registeredUser ? \`\${registeredUser.nama}.\${registeredUser.umur}\` : pushName;
      return {
          key: {
              fromMe: false,
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              id: "B8A88E109670B3D5E4D8F33D1CA19020"
          },
          message: {
              contactMessage: {
                  displayName: displayName,
                  vcard: \`BEGIN:VCARD\\nVERSION:3.0\\nN:;\${displayName};;;\\nFN:\${displayName}\\nEND:VCARD\`
              }
          }
      };
  }

  private getMenuContextInfo() {
      return {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363299949984606@newsletter',
              newsletterName: this.textNama || this.customBotName || 'JADIBOT BATAK VIP',
              serverMessageId: -1
          }
      };
  }
`;
    // Insert before "private async generateLocalBratVid"
    code = code.replace('private async generateLocalBratVid', helpers + '\n  private async generateLocalBratVid');
}

// 5. Replace allMenu handling contextInfo & quoted
if (code.includes('contextInfo: adContext')) {
    code = code.replace(/contextInfo:\s*adContext/g, 'contextInfo: this.getMenuContextInfo()');
}
code = code.replace(/const adContext = {[^}]*};\n/s, '');

// Replace allmenu quoted: msg
code = code.replace(
    /await this\.sock\.sendMessage\(jid, \{(.*?)\caption: menu,(.*?)\}, \{ quoted: msg \}\);/gs,
    'await this.sock.sendMessage(jid, {$1caption: menu,$2}, { quoted: this.getFakeMenuQuote(senderJid, pushName) });'
);

// 6. Replace specific menus
code = code.replace(
    /await this\.sock\.sendMessage\(jid, \{ text: ([A-Za-z]+Text) \}, \{ quoted: msg \}\);/g,
    'await this.sock.sendMessage(jid, { text: $1, contextInfo: this.getMenuContextInfo() }, { quoted: this.getFakeMenuQuote(senderJid, pushName) });'
);

// Special case for ownermenu which has ownerText and maybe some role checking text
code = code.replace(
    /await this\.sock\.sendMessage\(jid, \{ text: ownerText \}, \{ quoted: msg \}\);/g,
    'await this.sock.sendMessage(jid, { text: ownerText, contextInfo: this.getMenuContextInfo() }, { quoted: this.getFakeMenuQuote(senderJid, pushName) });'
);

// 7. Add command to ownerCommands array
if (!code.includes("'.addtextnama'")) {
    code = code.replace(
        "const ownerCommands = ['.ownermenu',",
        "const ownerCommands = ['.addtextnama', 'addtextnama', '.deltextnama', 'deltextnama', '.ownermenu',"
    );
}
// ownermenu text append addtextnama/deltextnama
if (!code.includes('│ .addtextnama / .deltextnama')) {
    code = code.replace(
        '│ .addnamabot\n',
        '│ .addtextnama / .deltextnama\n│ .addnamabot\n'
    );
}

// 8. Add command handlers for addtextnama/deltextnama
const handlerCode = `
    } else if (body.startsWith(".addtextnama") || body.startsWith("addtextnama")) {
      if (!isOwner) return await this.sock.sendMessage(jid, { text: \`👑 *Akses Ditolak*\\nPerintah ini hanya bisa digunakan oleh Owner!\` }, { quoted: msg });
      const args = messageContent.replace(/^\\.?addtextnama\\s*/i, "").trim();
      if (!args) {
          return await this.sock.sendMessage(jid, { text: "❌ Masukkan teksnya. Contoh: .addtextnama KYYINFINITE" }, { quoted: msg });
      }
      this.textNama = args;
      this.saveBotSettings();
      await this.sock.sendMessage(jid, { text: \`✅ Berhasil mengubah nama teks biru (newsletter) menjadi: \${args}\` }, { quoted: msg });
    } else if (body.startsWith(".deltextnama") || body.startsWith("deltextnama")) {
      if (!isOwner) return await this.sock.sendMessage(jid, { text: \`👑 *Akses Ditolak*\\nPerintah ini hanya bisa digunakan oleh Owner!\` }, { quoted: msg });
      this.textNama = null;
      this.saveBotSettings();
      await this.sock.sendMessage(jid, { text: "✅ Berhasil menghapus nama teks biru. Akan kembali ke default." }, { quoted: msg });
`;

if (!code.includes('.addtextnama')) {
    code = code.replace(
        '} else if (body.startsWith(".addowner") || body.startsWith("addowner")) {',
        handlerCode.trim() + '\n    } else if (body.startsWith(".addowner") || body.startsWith("addowner")) {'
    );
}

fs.writeFileSync('src/services/whatsapp.ts', code);
console.log('Patch complete.');
