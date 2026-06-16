import { initSearchBar, handleSearch } from './Navigation.mjs';
import DataServices from './DataServices.mjs';

// Initialize a new instance of the DataServices class to make sure we're working with the most up-to-date data.
const data = new DataServices();
// Initialize the search bar.
await initSearchBar(data.getSearchedMemes);

// Run the search when the page loads or using history navigation.
window.addEventListener('pageshow', async () => {
    await triggerSearchFromURL();
});

// Function to run the search if a search parameter exists in the URL.
async function triggerSearchFromURL() {
    const currentParams = new URLSearchParams(location.search);
    const searchString = currentParams.get('q')?.trim();
    const inputElement = document.getElementById('search-input');

    if (searchString && location.pathname === '/search') {
        inputElement.value = searchString;
        await handleSearch(searchString, data.getSearchedMemes, true); 
    } else {
        if (document.querySelector('.meme-gallery')) {
            document.querySelector('.meme-gallery').innerHTML = '';
        }
    }
}