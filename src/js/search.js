import { initSearchBar } from './Navigation.mjs';
import DataServices from './DataServices.mjs';

// Initialize a new instance of the DataServices class to make sure we're working with the most up-to-date data.
const data = new DataServices();

// Initialize the search bar.
await initSearchBar(data.getSearchedMemes);