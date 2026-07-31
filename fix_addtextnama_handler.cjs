const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

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

if (!code.includes('if (body.startsWith(".addtextnama")')) {
    code = code.replace(
        '} else if (body.startsWith(".addowner") || body.startsWith("addowner")) {',
        handlerCode.trim() + '\n    } else if (body.startsWith(".addowner") || body.startsWith("addowner")) {'
    );
}

fs.writeFileSync('src/services/whatsapp.ts', code);
