const axios = require('axios');
axios.get("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json").then(res => {
    console.log(res.data);
}).catch(console.error);
