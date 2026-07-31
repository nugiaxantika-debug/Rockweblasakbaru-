const fs = require('fs');

const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

// 1. Add ktpData field and file
if (!code.includes('private ktpDataFile')) {
    code = code.replace(
        "private karyawanDataFile: string;",
        "private karyawanDataFile: string;\n  private ktpDataFile: string;\n  private ktpData = new Map<string, any>();"
    );
}

// 2. Add to constructor
if (!code.includes('this.ktpDataFile =')) {
    code = code.replace(
        "this.karyawanDataFile = path.join(process.cwd(), `karyawan_data_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}.json`);",
        "this.karyawanDataFile = path.join(process.cwd(), `karyawan_data_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}.json`);\n    this.ktpDataFile = path.join(process.cwd(), `ktp_data_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}.json`);\n    this.loadKtpData();"
    );
}

// 3. Add load/save methods
if (!code.includes('private loadKtpData()')) {
    code = code.replace(
        "private loadKaryawanData()",
        `private loadKtpData() {
    try {
      if (!fs.existsSync(this.ktpDataFile)) return;
      const data = fs.readFileSync(this.ktpDataFile, "utf8");
      const obj = JSON.parse(data);
      for (const [k, v] of Object.entries(obj)) {
        this.ktpData.set(k, v);
      }
    } catch {
      // ignore
    }
  }

  private saveKtpData() {
    const obj = Object.fromEntries(this.ktpData);
    fs.writeFileSync(this.ktpDataFile, JSON.stringify(obj, null, 2));
  }

  private loadKaryawanData()`
    );
}

fs.writeFileSync(file, code);
console.log("Patched ktpData storage.");
