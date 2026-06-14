import { consumePendingPayload } from "./DataServices.mjs";

// For testing only:
const memeTemplate = consumePendingPayload();
document.getElementById('meme-preview').innerHTML = `<img src='${memeTemplate}'>`;