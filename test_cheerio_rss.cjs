const axios = require('axios');
const cheerio = require('cheerio');
const query = 'berita bola';
const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=id&gl=ID&ceid=ID:id`;

axios.get(rssUrl).then(res => {
    const $ = cheerio.load(res.data, { xmlMode: true });
    const items = [];
    $('item').slice(0, 5).each((i, el) => {
        const title = $(el).find('title').text();
        const link = $(el).find('link').text();
        const pubDate = $(el).find('pubDate').text();
        items.push({title, link, pubDate});
    });
    console.log(items);
}).catch(err => console.error(err.message));
