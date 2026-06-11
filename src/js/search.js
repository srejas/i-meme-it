import DataServices from './DataServices.mjs';
import { renderListWithTemplate, resultsTemplate } from './DisplayServices.mjs';

// Initialize a new instance of the DataServices class to make sure we're working with the most up-to-date data.
const data = new DataServices();

// Function to compile search results based on user input. It takes a string, splits it into individual search terms, and fetches memes for each term. The results are compiled into a single array and returned.
async function compileSearchResults(string) {
    const compiledResults = [];
    const searchTerms = string.toLowerCase().split(' ');

    // searchTerms.forEach(async (term) => {
    for (const term of searchTerms) {
        const searchResults = await data.getSearchedMemes(term);
        compiledResults.push(...searchResults);
    };

    return compiledResults;
}

// Function to handle the search functionality. It retrieves the search string from the input field to start. If it's not empty it checks if the current page is not the search page, and redirects if necessary. Then, it calls the compileSearchResults function to fetch the search results and renders them using the renderListWithTemplate method of the DisplayServices module.
export async function handleSearch(inputField, displayContainer) {
    const searchString = inputField.value.trim();

        if (searchString) {
            if (location.pathname !== '/search') {
                location.replace('/search');
            }

            try {
                const searchResults = await compileSearchResults(searchString);
                renderListWithTemplate(searchResults, resultsTemplate, displayContainer, undefined, true);
            } catch (error) {
                console.error('Error handling search:', error);
            }
        }
}

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const searchResultsContainer = document.getElementById('search-results').querySelector('ul');


// Event listener on the search button to run the handleSearch function when clicked.
searchButton.addEventListener('click', async (event) => {
    event.preventDefault();
    handleSearch(searchInput, searchResultsContainer);
});