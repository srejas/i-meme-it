export function renderListWithTemplate(list, templateFn, container, position = 'afterbegin', clear = false) {
    if (clear) {
        container.innerHTML = '';
    }
    const htmlStrings = list.map(templateFn);
    container.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function resultsTemplate(result) {
    return `
    <li class="meme-card">
        <a href="./edit.html">
            <img src="${result.url}" alt="${result.name}">
        </a>
    </li>`;
}