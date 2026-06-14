import { consumePendingPayload, savePayload } from "./DataServices.mjs";
import { renderListWithTemplate } from "./DisplayServices.mjs";

// Function to initialize the search bar. It accepts a data source from which you will conduct the search and a rendering function from which the results will be displayed as arguments.
export async function initSearchBar(dataSource, renderingFn = renderListWithTemplate) {
    // Get the button element attached to the input field.
    const searchButton = document.getElementById('search-button');
    // Get the search input element.
    const inputElement = document.getElementById('search-input');

    const pendingQuery = consumePendingPayload();
    if (pendingQuery && pendingQuery.replaceAll(' ', '').length >= 2) {
        inputElement.value = pendingQuery;
        await handleSearch(pendingQuery, dataSource, renderingFn);
    }

    if (searchButton || inputElement) {
        // Event listener on the search button to run the handleSearch function when clicked.
        searchButton.addEventListener('click', async (event) => {
            event.preventDefault();
        
            const searchQuery = inputElement.value;
            if (searchQuery.replaceAll(' ', '').length >= 2) {
                await handleSearch(searchQuery, dataSource, renderingFn);
            }
        });
    } return;
}

// Function to handle the search feature and display the results of the search. It accepts user input, a function for fetching data, and a function for displaying the results as arguments.
export async function handleSearch(userInput, fetchDataFn, displayFn) {
    const searchString = userInput.trim();
    if (location.pathname !== '/search') {
        savePayload(searchString);
        location.assign('/search');
        return;
    }

    const searchResultsContainer = document.getElementById('search-results').querySelector('ul');
    try {
        const searchResults = await compileSearchResults(searchString, fetchDataFn);
        displayFn(searchResults, searchResultsContainer, true);
    } catch (error) {
        console.error('Error handling search:', error);
    }
}

// Function to compile multiple search result promises into a single promise that resolves to an array of objects. It accepts a string and a function for fetching data as arguments. The string is split by spaces into an array of individual search terms, which are then maped with the dataGatheringFn. The resulting array of promises is resolved and returned.
export async function compileSearchResults(string, dataGatheringFn) {
    const searchTerms = string.toLowerCase().split(' ');
    const promises = searchTerms.map(term => dataGatheringFn(term));

    try {
        const allResults = await Promise.all(promises);
        return allResults.flat();
    } catch (error) {
        console.error('Error compiling search results:', error);
    }
}