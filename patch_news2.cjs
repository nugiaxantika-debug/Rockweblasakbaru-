const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

const regex = /try\s*{\s*const rssUrl = `https:\/\/news\.google\.com[\s\S]*?catch \(error\) {\s*console\.error\("Error fetching news:", error\);\s*await this\.sock\.sendMessage\(jid, { text: "❌ Terjadi kesalahan saat mengambil berita\." }, { quoted: msg }\);\s*}/m;

const replace = `try {
            const rssUrl = \`https://news.google.com/rss/search?q=\${encodeURIComponent(query)}&hl=id&gl=ID&ceid=ID:id\`;
            const { data } = await axios.get(rssUrl, { timeout: 10000 });
            const $ = cheerio.load(data, { xmlMode: true });
            
            const items: {title: string, link: string, pubDate: string}[] = [];
            $('item').slice(0, 5).each((i, el) => {
                const title = $(el).find('title').text();
                const link = $(el).find('link').text();
                const pubDate = $(el).find('pubDate').text();
                items.push({title, link, pubDate});
            });
            
            if (items.length > 0) {
                let text = \`📰 *Berita Terbaru - \${cmd.toUpperCase()}*\\n\\n\`;
                
                items.forEach((item, index) => {
                    let title = item.title.replace(/ - [^-]+$/, "");
                    text += \`\${index + 1}. *\${title}*\\n📅 \${item.pubDate}\\n🔗 \${item.link}\\n\\n\`;
                });
                
                await this.sock.sendMessage(jid, { text: text.trim() }, { quoted: msg });
                this.broadcastState(\`Responded to \${cmd} command\`);
            } else {
                await this.sock.sendMessage(jid, { text: "❌ Maaf, tidak ada berita ditemukan saat ini." }, { quoted: msg });
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            await this.sock.sendMessage(jid, { text: "❌ Terjadi kesalahan saat mengambil berita." }, { quoted: msg });
        }`;

if (regex.test(code)) {
    fs.writeFileSync(file, code.replace(regex, replace));
    console.log("Replaced successfully!");
} else {
    console.error("Could not find the target regex!");
}
