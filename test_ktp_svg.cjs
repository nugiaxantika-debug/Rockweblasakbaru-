const sharp = require('sharp');
const fs = require('fs');

async function createTemplate() {
    const svg = `
    <svg width="800" height="500" xmlns="http://www.w3.org/2000/svg">
        <!-- Background -->
        <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#8fd3f4"/>
                <stop offset="100%" stop-color="#84fab0"/>
            </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)"/>
        <!-- Header -->
        <text x="400" y="40" font-family="Arial" font-size="24" font-weight="bold" fill="black" text-anchor="middle">PROVINSI JAWA BARAT</text>
        <text x="400" y="70" font-family="Arial" font-size="24" font-weight="bold" fill="black" text-anchor="middle">KABUPATEN BEKASI</text>
        
        <!-- Placeholder for Photo -->
        <rect x="580" y="100" width="180" height="240" fill="#cccccc" stroke="#000" stroke-width="2"/>
        
        <!-- Static Labels -->
        <text x="30" y="120" font-family="Arial" font-size="18" font-weight="bold" fill="black">NIK</text>
        <text x="180" y="120" font-family="Arial" font-size="18" font-weight="bold" fill="black">:</text>

        <text x="30" y="150" font-family="Arial" font-size="16" fill="black">Nama</text>
        <text x="180" y="150" font-family="Arial" font-size="16" fill="black">:</text>

        <text x="30" y="180" font-family="Arial" font-size="16" fill="black">Tempat/Tgl Lahir</text>
        <text x="180" y="180" font-family="Arial" font-size="16" fill="black">:</text>

        <text x="30" y="210" font-family="Arial" font-size="16" fill="black">Jenis Kelamin</text>
        <text x="180" y="210" font-family="Arial" font-size="16" fill="black">:</text>
        
        <text x="340" y="210" font-family="Arial" font-size="16" fill="black">Gol. Darah :</text>

        <text x="30" y="240" font-family="Arial" font-size="16" fill="black">Alamat</text>
        <text x="180" y="240" font-family="Arial" font-size="16" fill="black">:</text>

        <text x="60" y="270" font-family="Arial" font-size="16" fill="black">RT/RW</text>
        <text x="180" y="270" font-family="Arial" font-size="16" fill="black">:</text>

        <text x="60" y="300" font-family="Arial" font-size="16" fill="black">Kel/Desa</text>
        <text x="180" y="300" font-family="Arial" font-size="16" fill="black">:</text>

        <text x="60" y="330" font-family="Arial" font-size="16" fill="black">Kecamatan</text>
        <text x="180" y="330" font-family="Arial" font-size="16" fill="black">:</text>

        <text x="30" y="360" font-family="Arial" font-size="16" fill="black">Agama</text>
        <text x="180" y="360" font-family="Arial" font-size="16" fill="black">:</text>

        <text x="30" y="390" font-family="Arial" font-size="16" fill="black">Status Perkawinan</text>
        <text x="180" y="390" font-family="Arial" font-size="16" fill="black">:</text>

        <text x="30" y="420" font-family="Arial" font-size="16" fill="black">Pekerjaan</text>
        <text x="180" y="420" font-family="Arial" font-size="16" fill="black">:</text>

        <text x="30" y="450" font-family="Arial" font-size="16" fill="black">Kewarganegaraan</text>
        <text x="180" y="450" font-family="Arial" font-size="16" fill="black">:</text>

        <text x="30" y="480" font-family="Arial" font-size="16" fill="black">Berlaku Hingga</text>
        <text x="180" y="480" font-family="Arial" font-size="16" fill="black">:</text>
    </svg>`;
    
    await sharp(Buffer.from(svg))
        .png()
        .toFile('public/templates/blank_ktp.png');
    console.log("Template KTP created");
}
createTemplate();
