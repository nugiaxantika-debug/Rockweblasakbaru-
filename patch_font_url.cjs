const fs = require('fs');

let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

// Replace the bad URL
code = code.replace(
    /const url = 'https:\/\/github\.com\/google\/fonts\/raw\/main\/ofl\/montserrat\/Montserrat-Bold\.ttf';/g,
    "const url = 'https://raw.githubusercontent.com/googlefonts/montserrat/master/fonts/ttf/Montserrat-Bold.ttf';"
);

fs.writeFileSync('src/services/whatsapp.ts', code);
console.log("URL patched!");
