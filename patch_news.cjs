const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');
const search = `        try {
            const rssUrl = \`https://news.google.com/rss/search?q=\${encodeURIComponent(query)}&hl=id&gl=ID&ceid=ID:id\`;
            const apiUrl = \`https://api.rss2json.com/v1/api.json?rss_url=\${encodeURIComponent(rssUrl)}\`;
            const { data } = await axios.get(apiUrl);
            
            if (data && data.items && data.items.length > 0) {
                let text = \`📰 *Berita Terbaru - \${cmd.toUpperCase()}*\\n\\n\`;
                const items = data.items.slice(0, 5);
                
                items.forEach((item: any, index: number) => {
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
const search2 = search.replace(/\(item: any, index: number\)/, '(item, index)');

const replace = `        try {
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

if (code.includes(search)) {
    fs.writeFileSync(file, code.replace(search, replace));
    console.log("Replaced with strict types");
} else if (code.includes(search2)) {
    fs.writeFileSync(file, code.replace(search2, replace));
    console.log("Replaced without strict types");
} else {
    console.error("Could not find the target string!");
}
