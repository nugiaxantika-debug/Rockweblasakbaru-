const fs = require('fs');
let content = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

content = content.replace(
    /    } else if \(body\.startsWith\("\.waifu"\) \|\| body\.startsWith\("waifu"\)\) \{\n       await this\.sock\.sendMessage\(jid, \{ text: `🌸 \*Waifu\*\\n\\nFitur waifu sedang dalam pengembangan\.` \}, \{ quoted: msg \}\);\n/,
    `    } else if (body.startsWith(".waifu") || body.startsWith("waifu")) {
       await this.sock.sendMessage(jid, { text: "⏳ *Sedang mengambil gambar waifu...*" }, { quoted: msg });
       try {
           const res = await axios.get("https://nekos.life/api/v2/img/waifu");
           if (res.data && res.data.url) {
               await this.sock.sendMessage(jid, { image: { url: res.data.url }, caption: "🌸 *Random Waifu*" }, { quoted: msg });
           } else {
               await this.sock.sendMessage(jid, { text: "❌ *Gagal mengambil gambar waifu.*" }, { quoted: msg });
           }
       } catch (e) {
           await this.sock.sendMessage(jid, { text: "❌ *Gagal mengambil gambar waifu.*" }, { quoted: msg });
       }\n`
);

content = content.replace(
    /    } else if \(body\.startsWith\("\.cekgempa"\) \|\| body\.startsWith\("cekgempa"\)\) \{\n       await this\.sock\.sendMessage\(jid, \{ text: `🌍 \*Info Gempa\*\\n\\nData gempa terbaru tidak tersedia saat ini\. Silakan cek situs web BMKG untuk informasi lebih lanjut\.` \}, \{ quoted: msg \}\);\n/,
    `    } else if (body.startsWith(".cekgempa") || body.startsWith("cekgempa")) {
       await this.sock.sendMessage(jid, { text: "⏳ *Sedang mengambil info gempa terbaru...*" }, { quoted: msg });
       try {
           const res = await axios.get("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json");
           if (res.data && res.data.Infogempa && res.data.Infogempa.gempa) {
               const g = res.data.Infogempa.gempa;
               const text = \`🌍 *Info Gempa Terbaru*\n\n📅 *Tanggal*: \${g.Tanggal}\n🕒 *Waktu*: \${g.Jam}\n📍 *Koordinat*: \${g.Coordinates}\n⚠️ *Magnitudo*: \${g.Magnitude}\n🌊 *Potensi*: \${g.Potensi}\n🗺️ *Wilayah*: \${g.Wilayah}\n\n*Sumber*: BMKG\`;
               if (g.Shakemap) {
                   const imgUrl = \`https://data.bmkg.go.id/DataMKG/TEWS/\${g.Shakemap}\`;
                   await this.sock.sendMessage(jid, { image: { url: imgUrl }, caption: text }, { quoted: msg });
               } else {
                   await this.sock.sendMessage(jid, { text: text }, { quoted: msg });
               }
           } else {
               await this.sock.sendMessage(jid, { text: "❌ *Data gempa tidak ditemukan.*" }, { quoted: msg });
           }
       } catch (e) {
           await this.sock.sendMessage(jid, { text: "❌ *Gagal mengambil data gempa.*" }, { quoted: msg });
       }\n`
);

fs.writeFileSync('src/services/whatsapp.ts', content);
