const axios = require('axios');
axios.get("https://nekos.life/api/v2/img/waifu").then(res => {
    console.log(res.data);
}).catch(console.error);
