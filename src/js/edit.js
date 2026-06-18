import { buildHeaderFooter, buildEditorControls, editMeme, displayMemeSuccessMessage } from "./DisplayServices.mjs";
import { copyCanvasToClipboard } from "./DataServices.mjs";

// Build the header and footer of the page.
buildHeaderFooter();

// Get the meme URL and name from the search parameters.
const urlParams = new URLSearchParams(location.search);
const memeUrl = urlParams.get('src');
const memeName = urlParams.get('name');

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
// memeTemplate.src = memeObject.url;
memeTemplate.src = memeUrl;

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

// Get the meme it button.
const generateButton = document.getElementById('generate-button');

// Event listener to copy the created meme to the clipboard, display a success message that populates a download button, and handles the timing of it all when clicked.
generateButton.addEventListener('click', async () => {
    // Disable the button so it's not accidently pressed again when the new button populates.
    generateButton.disabled = true; 
    // Get the current button property values so they can be set to their starting state after the events.
    const originalText = generateButton.innerText;
    const originalBg = generateButton.style.backgroundColor;
    const originalColor = generateButton.style.color;
    const originalTransition = generateButton.style.transition; 

    // Try copying the created blob image to the clipboard and displaying the success message. Catch any errors.
    try {
      const imageBlob = await copyCanvasToClipboard(canvas);    
      const spawnedDownloadButton = displayMemeSuccessMessage(imageBlob, memeName, generateButton);  

      setTimeout(() => {
        // Remove the download button from the DOM.
        if (spawnedDownloadButton) {
          spawnedDownloadButton.remove();
        }

        // Put everything back the way it was.
        generateButton.innerText = originalText;
        generateButton.style.backgroundColor = originalBg;
        generateButton.style.color = originalColor;
        generateButton.style.transition = originalTransition;
        generateButton.disabled = false;
      }, 7000);

    } catch (error) {
      console.error('Meme generation failure:', error);
      alert('Could not copy image.');
    
      // Still put everything back the way it was if an error is caught.
      generateButton.innerText = originalText;
      generateButton.style.backgroundColor = originalBg;
      generateButton.style.color = originalColor;
      generateButton.style.transition = originalTransition;
      generateButton.disabled = false;
    }
});