import DataServices, { savePayload } from './DataServices.mjs';
import { renderListWithTemplate } from './DisplayServices.mjs';
import { initSearchBar } from './Navigation.mjs';

// Initialize a new instance of the DataServices class to make sure we're working with the most up-to-date data.
const data = new DataServices();
// Fetch the trending memes from the data service.
const trendingMemes = await data.getTrendingMemes();
// Get the container element where the trending memes will be displayed.
const browseResultsContainer = document.getElementById('browse-results').querySelector('ul');

// Display the trending memes on the home page using the renderListWithTemplate method of the DisplayServices module.
renderListWithTemplate(trendingMemes, browseResultsContainer);

// Initialize the search bar.
await initSearchBar(data.getSearchedMemes);