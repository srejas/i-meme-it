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
        <div class="box-row" data-box-id="0">
            <div class="text-container">
                <textarea id="top-text" class="text" placeholder="Top Text"></textarea>
            </div>
            <div class="text-settings">
                <input type="color" id=topTextColor" value="#ffffff">
                <input type="color" id=topBoarderColor" value="#000000">
            </div>
        </div>

        <div class="box-row" data-box-id="1">
            <div class="text-container">
                <textarea id="bottom-text" class="text" placeholder="Bottom Text"></textarea>
            </div>
            <div class="text-settings">
                <input type="color" id=topTextColor" value="#ffffff">
                <input type="color" id=topBoarderColor" value="#000000">
            </div>
        </div>
        <button id="generate-button">Meme It</button>
    </div>
    `;
}