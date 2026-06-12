import DataServices from './DataServices.mjs';
import { handleSearch, consumePendingSearchQuery } from './SearchServices.mjs';
import { renderListWithTemplate } from './DisplayServices.mjs';

// Initialize a new instance of the DataServices class to make sure we're working with the most up-to-date data.
export const data = new DataServices();

// Get the button element attached to the input field.
const searchButton = document.getElementById('search-button');
// Get the search input element.
const inputElement = document.getElementById('search-input');

const pendingQuery = consumePendingSearchQuery();
if (pendingQuery && pendingQuery.replaceAll(' ', '').length >= 2) {
    inputElement.value = pendingQuery;
    await handleSearch(pendingQuery, data.getSearchedMemes, renderListWithTemplate);
}

// Event listener on the search button to run the handleSearch function when clicked.
searchButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const searchQuery = inputElement.value;
    if (searchQuery.replaceAll(' ', '').length >= 2) {
        await handleSearch(searchQuery, data.getSearchedMemes, renderListWithTemplate);
    }
});