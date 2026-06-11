// Function to handle the search feature and display the results of the search. It accepts user input, a function for fetching data, and a function for displaying the results as arguments. It redirects to the search page if needed, then calls the compileSearchResults function to fetch the search results and renders them in the searchResultsContainer using the passed in displayFn.
export async function handleSearch(userInput, fetchDataFn, displayFn) {
    const searchString = userInput.trim();
    if (location.pathname !== '/search') {
        location.replace('/search');
    }

    const searchResultsContainer = document.getElementById('search-results').querySelector('ul');
    try {
        const searchResults = await compileSearchResults(searchString, fetchDataFn);
        displayFn(searchResults, searchResultsContainer, true);
    } catch (error) {
        console.error('Error handling search:', error);
    }
}

// Function to compile multiple search result promises into a single promise that resolves to an array of objects. It accepts a string and a function for fetching data as an arguments. The string is split by spaces into an array of individual search terms, which are then maped with the dataGatheringFn. The resulting array of promises is resolved and returned.
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