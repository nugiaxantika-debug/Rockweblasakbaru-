const fs = require('fs');
const { execSync } = require('child_process');

try {
    const res = execSync('grep -rn "compression" node_modules/@whiskeysockets/baileys/ || true', { encoding: 'utf8' });
    console.log("Baileys:", res);
} catch (e) {}

try {
    const res2 = execSync('grep -rn "compression" node_modules/sharp/ || true', { encoding: 'utf8' });
    // console.log("Sharp:", res2);
} catch (e) {}

