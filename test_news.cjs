const axios = require('axios');
const query = 'berita bola';
const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=id&gl=ID&ceid=ID:id`;
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
axios.get(apiUrl).then(res => console.log(res.data)).catch(err => console.error(err.message));
