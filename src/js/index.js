import DataServices from './DataServices.mjs';
import { renderListWithTemplate, resultsTemplate } from './DisplayServices.mjs';

const data = new DataServices();
const trendingMemes = await data.getTrendingMemes();
const trendingContainer = document.getElementById('browse-results').querySelector('ul');

renderListWithTemplate(trendingMemes, resultsTemplate, trendingContainer);