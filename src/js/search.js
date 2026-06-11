import DataServices from './DataServices.mjs';
import { renderListWithTemplate, resultsTemplate } from './DisplayServices.mjs';

// Initialize a new instance of the DataServices class to make sure we're working with the most up-to-date data.
export const data = new DataServices();

// Function to handle the search feature and display the results of the search. It takes user input as an argument. It redirects to the search page if needed, then calls the compileSearchResults function to fetch the search results and renders them in the searchResultsContainer using the renderListWithTemplate method of the DisplayServices module.
export async function handleSearch(userInput) {
    if (location.pathname !== '/search') {
        location.replace('/search');
    }
    const searchResultsContainer = document.getElementById('search-results').querySelector('ul');

    const searchString = userInput.trim();
    try {
        const searchResults = await compileSearchResults(searchString);
        renderListWithTemplate(searchResults, searchResultsContainer, true);
    } catch (error) {
        console.error('Error handling search:', error);
    }
}

// Function to compile multiple search arrays into a single array of objects and return it. It accepts a string as an argument, splits that by spaces into individual search terms, and fetches an array of meme objects for each term using the getSearchedMemes method of the DataServices module.
export async function compileSearchResults(string) {
    const compiledResults = [];
    const searchTerms = string.toLowerCase().split(' ');

    for (const term of searchTerms) {
        const searchResults = await data.getSearchedMemes(term);
        compiledResults.push(...searchResults);
    };

    return compiledResults;
}

// Get the button element attached to the input field.
const searchButton = document.getElementById('search-button');
// Get the search input element.
const inputElement = document.getElementById('search-input');


// Event listener on the search button to run the handleSearch function when clicked.
searchButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const searchQuery = inputElement.value;
    if (searchQuery.replaceAll(' ', '').length >= 2) {
        handleSearch(searchQuery);
    }
});