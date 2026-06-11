import DataServices from './DataServices.mjs';
import { handleSearch, compileSearchResults } from './SearchServices.mjs';
import { renderListWithTemplate, resultsTemplate } from './DisplayServices.mjs';

// Initialize a new instance of the DataServices class to make sure we're working with the most up-to-date data.
const data = new DataServices();
// Fetch the trending memes from the data service.
const trendingMemes = await data.getTrendingMemes();
// Get the container element where the trending memes will be displayed.
const browseResultsContainer = document.getElementById('browse-results').querySelector('ul');

// Display the trending memes on the home page using the renderListWithTemplate method of the DisplayServices module.
renderListWithTemplate(trendingMemes, browseResultsContainer);

// Get the button element attached to the input field.
const searchButton = document.getElementById('search-button');
// Get the search input element.
const inputElement = document.getElementById('search-input');

// Event listener on the search button to run the handleSearch function when clicked.
searchButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const searchQuery = inputElement.value;
    if (searchQuery.replaceAll(' ', '').length >= 2) {
        handleSearch(searchQuery, data.getSearchedMemes, renderListWithTemplate);
    }
});