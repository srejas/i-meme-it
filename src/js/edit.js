import { consumePendingPayload } from "./DataServices.mjs";

// For testing only:
const memeObject = JSON.parse(consumePendingPayload());
document.getElementById('meme-preview').innerHTML = `<img src='${memeObject.url}' alt="${memeObject.name}">`;