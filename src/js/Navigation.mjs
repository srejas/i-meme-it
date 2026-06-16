import { savePayload } from "./DataServices.mjs";
import { renderListWithTemplate } from "./DisplayServices.mjs";

// Function to initialize the search bar. It accepts a data source from which you will conduct the search as an argument.
export async function initSearchBar(dataSource) {
    // Get the button element attached to the input field.
    const searchButton = document.getElementById('search-button');
    // Get the search input element.
    const inputElement = document.getElementById('search-input');

    if (searchButton && inputElement) {
        // Event listener on the search button to run the handleSearch function when clicked.
        searchButton.addEventListener('click', async (event) => {
            event.preventDefault();
        
            const searchQuery = inputElement.value.trim();
            if (searchQuery.length >= 2) {
                await handleSearch(searchQuery, dataSource);
            }
        })

        document.querySelector('.meme-gallery').addEventListener('click', (event) => {
            const clickedMeme = event.target.closest('a');

            if (clickedMeme) {
                event.preventDefault();

                const memePayload = clickedMeme.dataset.memeInfo;
                savePayload(memePayload);
                location.assign(clickedMeme.href);
            }
        })

    }
}

// Function to handle the search feature and display the results of the search. It accepts user input, a function for fetching data, a default false boolean, and a default function for rendering the results as arguments.
export async function handleSearch(userInput, fetchDataFn, isFromURL = false, renderingFn = renderListWithTemplate) {
    const searchString = userInput.trim();

    if (!isFromURL) {
        const currentParams = new URLSearchParams(location.search);
        if (location.pathname !== '/search' || currentParams.get('q') !== searchString) {
            location.assign(`/search?q=${encodeURIComponent(searchString)}`);
            return;
        }
    }

    const searchResultsContainer = document.getElementById('search-results').querySelector('ul');
    try {
        const searchResults = await compileSearchResults(searchString, fetchDataFn);
        renderingFn(searchResults, searchResultsContainer, true);
    } catch (error) {
        console.error('Error handling search:', error);
    }
}

// Function to compile multiple search result promises into a single promise that resolves to an array of objects. It accepts a string and a function for fetching data as arguments. The string is split by spaces and filtered into an array of individual search terms, which are then maped with the dataGatheringFn. The resulting array of promises is resolved and returned.
export async function compileSearchResults(string, dataGatheringFn) {
    const searchTerms = string.toLowerCase().split(' ').filter(term => term.trim().length >= 2);
    const promises = searchTerms.map(term => dataGatheringFn(term));

    try {
        const allResults = await Promise.all(promises);
        return allResults.flat();
    } catch (error) {
        console.error('Error compiling search results:', error);
    }
}