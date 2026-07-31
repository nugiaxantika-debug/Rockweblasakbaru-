const opentype = require('opentype.js');
const fs = require('fs');
// Create a fake TTF with a valid signature but no tables
const buf = Buffer.alloc(12);
buf.writeUInt32BE(0x00010000, 0); // TTF signature
buf.writeUInt16BE(0, 4); // numTables = 0
try {
    fs.writeFileSync('fake.ttf', buf);
    opentype.loadSync('fake.ttf');
} catch(e) {
    console.log("Error:", e.message);
}
