// A module for rendering lists of items to a specified DOM container using a template function. It accepts a list of items, a template function to generate HTML for each item, and a container element where the generated HTML will be inserted. It also allows for specifying the position of the inserted HTML and whether to clear the container before inserting new content.
export function renderListWithTemplate(list, templateFn, container, position = 'afterbegin', clear = false) {
    if (clear) {
        container.innerHTML = '';
    }
    const htmlStrings = list.map(templateFn);
    container.insertAdjacentHTML(position, htmlStrings.join(''));
}

// A template function specifically for rendering meme results. It takes a meme object and returns an HTML string representing a list item with the meme's image and name.
export function resultsTemplate(result) {
    return `
    <li class="meme-card">
        <a href="./edit">
            <img src="${result.url}" alt="${result.name}">
        </a>
    </li>`;
}