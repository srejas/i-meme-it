import { buildEditorControls } from "./DisplayServices.mjs";
import { consumePendingPayload } from "./DataServices.mjs";

// Load in the saved meme object and store in a variable.
const memeObject = JSON.parse(consumePendingPayload());
// Build the editor controls on the page.
document.getElementById('editor-controls').innerHTML = buildEditorControls();