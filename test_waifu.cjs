const axios = require('axios');
axios.get("https://api.waifu.pics/sfw/waifu").then(res => {
    console.log(res.data);
}).catch(console.error);
