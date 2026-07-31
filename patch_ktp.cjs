const fs = require('fs');

const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

// 1. Add ktpCommands
if (!code.includes('const ktpCommands')) {
    code = code.replace(
        "const cdramaCommands =",
        "const ktpCommands = ['.ktpmenu', 'ktpmenu', '.createktp', 'createktp', '.cekktp', 'cekktp', '.getktp', 'getktp', '.editktp', 'editktp', '.deletektp', 'deletektp', '.listktp', 'listktp', '.statusktp', 'statusktp'];\n    const cdramaCommands ="
    );
}

// 2. Add to totalFitur
if (!code.includes('+ ktpCommands.length')) {
    code = code.replace(
        "+ cdramaCommands.length;",
        "+ cdramaCommands.length + ktpCommands.length;"
    );
}

// 3. Add to allmenu
if (!code.includes('│ .ktpmenu')) {
    code = code.replace(
        "│ .cdramamenu",
        "│ .cdramamenu\n│ .ktpmenu"
    );
}

// 4. Add ktpmenu response handler
if (!code.includes('else if (body === "ktpmenu"')) {
    code = code.replace(
        'else if (body === "karyawanmenu"',
        'else if (body === "ktpmenu" || body === ".ktpmenu" || body === "ktp menu" || body === ".ktp menu") {\n      const ktpText = `🪪 *KTP Menu*\\n\\n│ .createktp\\n│ .cekktp\\n│ .getktp\\n│ .editktp\\n│ .deletektp\\n│ .listktp\\n│ .statusktp`;\n      await this.sock.sendMessage(jid, { text: ktpText }, { quoted: msg });\n      this.broadcastState(`Responded to ktpmenu command`);\n    } else if (body === "karyawanmenu"'
    );
}

fs.writeFileSync(file, code);
console.log("Patched ktp commands and menus.");
