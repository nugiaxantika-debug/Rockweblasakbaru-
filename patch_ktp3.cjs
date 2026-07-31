const fs = require('fs');

const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

const ktpLogic = `
    } else if (requestedCmd === ".createktp" || requestedCmd === "createktp") {
      const args = messageContent.replace(/^\\.?createktp\\s*/i, "").split("|");
      if (args.length < 14) {
        return await this.sock.sendMessage(jid, { text: "Format salah!\\nContoh: .createktp NIK|Nama|Tempat/Tgl Lahir|Jenis Kelamin|Gol Darah|Alamat|RT/RW|Kel/Desa|Kecamatan|Agama|Status Perkawinan|Pekerjaan|Kewarganegaraan|Berlaku Hingga" }, { quoted: msg });
      }
      const [nik, nama, ttl, jk, goldar, alamat, rtrw, kel, kec, agama, status, kerja, wn, berlaku] = args.map(a => a.trim());
      
      this.ktpData.set(nik, { nik, nama, ttl, jk, goldar, alamat, rtrw, kel, kec, agama, status, kerja, wn, berlaku });
      this.saveKtpData();
      
      const svg = \`
      <svg width="800" height="500" xmlns="http://www.w3.org/2000/svg">
          <defs>
              <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#8fd3f4"/>
                  <stop offset="100%" stop-color="#84fab0"/>
              </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg)"/>
          <text x="400" y="40" font-family="Arial" font-size="24" font-weight="bold" fill="black" text-anchor="middle">PROVINSI JAWA BARAT</text>
          <text x="400" y="70" font-family="Arial" font-size="24" font-weight="bold" fill="black" text-anchor="middle">KABUPATEN BEKASI</text>
          
          <rect x="580" y="100" width="180" height="240" fill="#cccccc" stroke="#000" stroke-width="2"/>
          <text x="670" y="220" font-family="Arial" font-size="16" fill="#666" text-anchor="middle">FOTO</text>
          
          <text x="30" y="120" font-family="Arial" font-size="18" font-weight="bold" fill="black">NIK</text>
          <text x="180" y="120" font-family="Arial" font-size="18" font-weight="bold" fill="black">:</text>
          <text x="200" y="120" font-family="Arial" font-size="18" font-weight="bold" fill="black">\${nik}</text>

          <text x="30" y="150" font-family="Arial" font-size="16" fill="black">Nama</text>
          <text x="180" y="150" font-family="Arial" font-size="16" fill="black">:</text>
          <text x="200" y="150" font-family="Arial" font-size="16" fill="black">\${nama}</text>

          <text x="30" y="180" font-family="Arial" font-size="16" fill="black">Tempat/Tgl Lahir</text>
          <text x="180" y="180" font-family="Arial" font-size="16" fill="black">:</text>
          <text x="200" y="180" font-family="Arial" font-size="16" fill="black">\${ttl}</text>

          <text x="30" y="210" font-family="Arial" font-size="16" fill="black">Jenis Kelamin</text>
          <text x="180" y="210" font-family="Arial" font-size="16" fill="black">:</text>
          <text x="200" y="210" font-family="Arial" font-size="16" fill="black">\${jk}</text>
          
          <text x="340" y="210" font-family="Arial" font-size="16" fill="black">Gol. Darah : \${goldar}</text>

          <text x="30" y="240" font-family="Arial" font-size="16" fill="black">Alamat</text>
          <text x="180" y="240" font-family="Arial" font-size="16" fill="black">:</text>
          <text x="200" y="240" font-family="Arial" font-size="16" fill="black">\${alamat}</text>

          <text x="60" y="270" font-family="Arial" font-size="16" fill="black">RT/RW</text>
          <text x="180" y="270" font-family="Arial" font-size="16" fill="black">:</text>
          <text x="200" y="270" font-family="Arial" font-size="16" fill="black">\${rtrw}</text>

          <text x="60" y="300" font-family="Arial" font-size="16" fill="black">Kel/Desa</text>
          <text x="180" y="300" font-family="Arial" font-size="16" fill="black">:</text>
          <text x="200" y="300" font-family="Arial" font-size="16" fill="black">\${kel}</text>

          <text x="60" y="330" font-family="Arial" font-size="16" fill="black">Kecamatan</text>
          <text x="180" y="330" font-family="Arial" font-size="16" fill="black">:</text>
          <text x="200" y="330" font-family="Arial" font-size="16" fill="black">\${kec}</text>

          <text x="30" y="360" font-family="Arial" font-size="16" fill="black">Agama</text>
          <text x="180" y="360" font-family="Arial" font-size="16" fill="black">:</text>
          <text x="200" y="360" font-family="Arial" font-size="16" fill="black">\${agama}</text>

          <text x="30" y="390" font-family="Arial" font-size="16" fill="black">Status Perkawinan</text>
          <text x="180" y="390" font-family="Arial" font-size="16" fill="black">:</text>
          <text x="200" y="390" font-family="Arial" font-size="16" fill="black">\${status}</text>

          <text x="30" y="420" font-family="Arial" font-size="16" fill="black">Pekerjaan</text>
          <text x="180" y="420" font-family="Arial" font-size="16" fill="black">:</text>
          <text x="200" y="420" font-family="Arial" font-size="16" fill="black">\${kerja}</text>

          <text x="30" y="450" font-family="Arial" font-size="16" fill="black">Kewarganegaraan</text>
          <text x="180" y="450" font-family="Arial" font-size="16" fill="black">:</text>
          <text x="200" y="450" font-family="Arial" font-size="16" fill="black">\${wn}</text>

          <text x="30" y="480" font-family="Arial" font-size="16" fill="black">Berlaku Hingga</text>
          <text x="180" y="480" font-family="Arial" font-size="16" fill="black">:</text>
          <text x="200" y="480" font-family="Arial" font-size="16" fill="black">\${berlaku}</text>
      </svg>\`;
      
      try {
          const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
          await this.sock.sendMessage(jid, { image: buffer, caption: \`✅ KTP berhasil dibuat untuk NIK: \${nik}\` }, { quoted: msg });
      } catch (err) {
          console.error("Error creating KTP", err);
          await this.sock.sendMessage(jid, { text: "❌ Gagal membuat gambar KTP." }, { quoted: msg });
      }
    } else if (requestedCmd === ".cekktp" || requestedCmd === "cekktp") {
      const args = messageContent.replace(/^\\.?cekktp\\s*/i, "").trim();
      if (!args) return await this.sock.sendMessage(jid, { text: "Contoh: .cekktp NIK" }, { quoted: msg });
      
      if (this.ktpData.has(args)) {
          await this.sock.sendMessage(jid, { text: \`✅ KTP dengan NIK \${args} terdaftar di database.\` }, { quoted: msg });
      } else {
          await this.sock.sendMessage(jid, { text: \`❌ KTP dengan NIK \${args} tidak ditemukan.\` }, { quoted: msg });
      }
    } else if (requestedCmd === ".getktp" || requestedCmd === "getktp") {
      const args = messageContent.replace(/^\\.?getktp\\s*/i, "").trim();
      if (!args) return await this.sock.sendMessage(jid, { text: "Contoh: .getktp NIK" }, { quoted: msg });
      
      const data = this.ktpData.get(args);
      if (!data) return await this.sock.sendMessage(jid, { text: \`❌ KTP dengan NIK \${args} tidak ditemukan.\` }, { quoted: msg });
      
      let text = \`🪪 *Data KTP - \${data.nik}*\\n\\n\`;
      for (const [k, v] of Object.entries(data)) {
          text += \`│ *\${k.toUpperCase()}*: \${v}\\n\`;
      }
      await this.sock.sendMessage(jid, { text }, { quoted: msg });
    } else if (requestedCmd === ".editktp" || requestedCmd === "editktp") {
      const args = messageContent.replace(/^\\.?editktp\\s*/i, "").split("|");
      if (args.length < 3) return await this.sock.sendMessage(jid, { text: "Format: .editktp NIK|field|value\\nContoh: .editktp 1234|nama|Budi Baru" }, { quoted: msg });
      
      const nik = args[0].trim();
      const field = args[1].trim().toLowerCase();
      const value = args[2].trim();
      
      if (!this.ktpData.has(nik)) return await this.sock.sendMessage(jid, { text: \`❌ KTP dengan NIK \${nik} tidak ditemukan.\` }, { quoted: msg });
      
      const data = this.ktpData.get(nik);
      if (data[field] !== undefined) {
          data[field] = value;
          this.ktpData.set(nik, data);
          this.saveKtpData();
          await this.sock.sendMessage(jid, { text: \`✅ Field \${field} pada NIK \${nik} berhasil diubah menjadi \${value}.\` }, { quoted: msg });
      } else {
          await this.sock.sendMessage(jid, { text: \`❌ Field \${field} tidak valid.\` }, { quoted: msg });
      }
    } else if (requestedCmd === ".deletektp" || requestedCmd === "deletektp") {
      const args = messageContent.replace(/^\\.?deletektp\\s*/i, "").trim();
      if (!args) return await this.sock.sendMessage(jid, { text: "Contoh: .deletektp NIK" }, { quoted: msg });
      
      if (this.ktpData.has(args)) {
          this.ktpData.delete(args);
          this.saveKtpData();
          await this.sock.sendMessage(jid, { text: \`✅ KTP dengan NIK \${args} berhasil dihapus.\` }, { quoted: msg });
      } else {
          await this.sock.sendMessage(jid, { text: \`❌ KTP dengan NIK \${args} tidak ditemukan.\` }, { quoted: msg });
      }
    } else if (requestedCmd === ".listktp" || requestedCmd === "listktp") {
      if (this.ktpData.size === 0) return await this.sock.sendMessage(jid, { text: "📭 Database KTP kosong." }, { quoted: msg });
      
      let text = \`🪪 *Daftar KTP (Total: \${this.ktpData.size})*\\n\\n\`;
      let i = 1;
      for (const [nik, data] of this.ktpData.entries()) {
          text += \`\${i}. \${data.nik} - \${data.nama}\\n\`;
          i++;
      }
      await this.sock.sendMessage(jid, { text }, { quoted: msg });
    } else if (requestedCmd === ".statusktp" || requestedCmd === "statusktp") {
      const args = messageContent.replace(/^\\.?statusktp\\s*/i, "").trim();
      if (!args) return await this.sock.sendMessage(jid, { text: "Contoh: .statusktp NIK" }, { quoted: msg });
      
      const data = this.ktpData.get(args);
      if (!data) return await this.sock.sendMessage(jid, { text: \`❌ KTP dengan NIK \${args} tidak ditemukan.\` }, { quoted: msg });
      
      await this.sock.sendMessage(jid, { text: \`✅ KTP \${data.nik} a.n \${data.nama} status: *AKTIF*\` }, { quoted: msg });
`;

code = code.replace(
    "} else if (body.startsWith(\".addproduk\") || body.startsWith(\"addproduk\")) {",
    ktpLogic + "\n    } else if (body.startsWith(\".addproduk\") || body.startsWith(\"addproduk\")) {"
);

fs.writeFileSync(file, code);
console.log("Patched ktp commands logic.");
