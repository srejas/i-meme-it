import DataServices from './DataServices.mjs';
import { renderListWithTemplate, resultsTemplate } from './DisplayServices.mjs';

// Initialize a new instance of the DataServices class to make sure we're working with the most up-to-date data.
const data = new DataServices();
// Fetch the trending memes from the data service and store them in a variable.
const trendingMemes = await data.getTrendingMemes();
// Get the container element where the trending memes will be displayed.
const trendingContainer = document.getElementById('browse-results').querySelector('ul');

// Display the trending memes on the home page using the renderListWithTemplate method of the DisplayServices module.
renderListWithTemplate(trendingMemes, resultsTemplate, trendingContainer);