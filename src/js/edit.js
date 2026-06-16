import { buildEditorControls, editMeme } from "./DisplayServices.mjs";
import { consumePendingPayload } from "./DataServices.mjs";

// Load in the saved meme object and store in a variable.
const memeObject = JSON.parse(consumePendingPayload());

// Build the editor controls on the page.
document.getElementById('editor-controls').innerHTML = buildEditorControls();
// Get the canvas element from the DOM and set it's drawing context.
const canvas = document.getElementById('meme-canvas');
const drawingContext = canvas.getContext('2d');

// Get the top text elements from the previously built editor controls.
const topTextElement = document.getElementById('top-text');
const topTextFill = document.getElementById('top-text-color');
const topTextBorder = document.getElementById('top-border-color');

// Get the bottom text elements from the previously built editor controls.
const bottomTextElement = document.getElementById('bottom-text');
const bottomTextFill = document.getElementById('bottom-text-color');
const bottomTextBorder = document.getElementById('bottom-border-color');

// Create a new image from the meme object so that it can be read from the canvas.
const memeTemplate = new Image();
memeTemplate.crossOrigin = 'anonymous';
memeTemplate.src = memeObject.url;

// Event listener to initialize the meme editing canvas once the image has fully loaded.
memeTemplate.onload = () => {
    editMeme(memeTemplate, canvas, drawingContext, topTextElement.value, topTextFill, topTextBorder, bottomTextElement.value, bottomTextFill, bottomTextBorder)
}

// Adding an event listenter to each of the editor control DOM elements that will update the canvas with each input.
[topTextElement, topTextFill, topTextBorder, bottomTextElement, 
    bottomTextFill, bottomTextBorder].forEach(htmlElement => {
        htmlElement.addEventListener('input', () => {
            editMeme(memeTemplate, canvas, drawingContext, topTextElement.value, topTextFill, 
            topTextBorder, bottomTextElement.value, bottomTextFill, bottomTextBorder
        )})
    });