const { bratvid } = require('brat-farel');
async function test() {
    try {
        const videoBuffer = await bratvid("test");
        console.log("bratvid success, length:", videoBuffer.length);
    } catch(e) {
        console.error("bratvid error:", e.message);
    }
}
test();
