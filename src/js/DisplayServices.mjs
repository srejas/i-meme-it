// A module for rendering lists of items to a specified DOM container using a template function. It accepts a list of items and a container element where the generated HTML will be inserted as arguments. It allows you to specify whether to clear the container before inserting new content and the position of the inserted HTML.
export function renderListWithTemplate(list, container, clear = false, templateFn = memeCardTemplate, position = 'afterbegin') {
    if (clear) {
        container.innerHTML = '';
    }
    const htmlStrings = list.map(templateFn);
    container.insertAdjacentHTML(position, htmlStrings.join(''));
}

// A template function for rendering a meme card. It takes a meme object and returns an HTML string representing a list item with the object itself, it's image, and name.
export function memeCardTemplate(meme) {
    return `
    <li class="meme-card">
        <a href="./edit" data-meme-info='${JSON.stringify(meme)}'>
            <img src="${meme.url}" alt="${meme.name}">
        </a>
    </li>`;
}

// A function to build the editor controls for meme editing. It returns an HTML string representing the text editing div for 2 text boxes and a generation button.
export function buildEditorControls() {
    return `
    <div class="text-boxes">
        <div class="box-row">
            <div class="text-container">
                <textarea id="top-text" class="text" placeholder="Top Text"></textarea>
            </div>
            <div class="text-settings">
                <input type="color" id="top-text-color" value="#ffffff">
                <input type="color" id="top-border-color" value="#000000">
            </div>
        </div>

        <div class="box-row">
            <div class="text-container">
                <textarea id="bottom-text" class="text" placeholder="Bottom Text"></textarea>
            </div>
            <div class="text-settings">
                <input type="color" id="bottom-text-color" value="#ffffff">
                <input type="color" id="bottom-border-color" value="#000000">
            </div>
        </div>
        <button id="generate-button">Meme It</button>
    </div>
    `;
}

// A function to draw text on a meme template in a canvas and render it. It accepts the meme template you will be adding the text to, the canvas element from the DOM, the type of drawing, the top text input from the user, the top text color, the top text border color, the bottom text input from the user, the bottom text color, and the bottom text border color as arguments.
export function editMeme (memeTemplate, canvasElement, canvasContext, topTextInput, topTextFill, topTextBorder, bottomTextInput, bottomTextFill, bottomTextBorder) {
    // Canvas creation and format
    canvasContext.drawImage(memeTemplate, 0, 0, canvasElement.width, canvasElement.height);
    canvasContext.textAlign = 'center';
    canvasContext.font = 'bold 40px \'Calibri Light\', sans-serif';

    // Top text box format
    canvasContext.textBaseline = 'top';
    canvasContext.fillStyle = topTextFill.value;
    canvasContext.strokeStyle = topTextBorder.value;
    canvasContext.lineWidth = 6;

    canvasContext.strokeText(topTextInput.toUpperCase(), canvasElement.width / 2, 20);
    canvasContext.fillText(topTextInput.toUpperCase(), canvasElement.width / 2, 20);

    // Bottom text box format
    canvasContext.textBaseline = 'bottom';
    canvasContext.fillStyle = bottomTextFill.value;
    canvasContext.strokeStyle = bottomTextBorder.value;
    canvasContext.lineWidth = 6;

    canvasContext.strokeText(bottomTextInput.toUpperCase(), canvasElement.width / 2, canvasElement.height - 20);
    canvasContext.fillText(bottomTextInput.toUpperCase(), canvasElement.width / 2, canvasElement.height - 20);
}