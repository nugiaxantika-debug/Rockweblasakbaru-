const body = ".daftar budi.18";
const requestedCmd = body.split(/[\s\n]+/)[0];
const possibleCommandName = requestedCmd.replace(/^\.?/, "").toLowerCase();
console.log(possibleCommandName);
const payload = body.replace(/^\.?daftar\s*/i, "").trim();
console.log(payload);
const parts = payload.split(".");
console.log(parts);
