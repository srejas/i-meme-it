// The two APIs that will be used to fetch trending memes and search for memes based on user input
const trendingURL = 'https://api.imgflip.com/get_memes';
const searchURL = 'https://justmeme.wtf/api/v1/templates/search?q=';

// DataServices class that handles any and all interactions with the APIs.
export default class DataServices {
    // Method to fetch trending memes from the API. Returns a promise that resolves to an array of meme objects.
    async getTrendingMemes() {
        try {
            const response = await fetch(trendingURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.data.memes;
        } catch (error) {
            console.error('Error fetching trending memes:', error);
            throw error;
        }
    }

    // Method to search for memes based on user input. Returns a promise that resolves to an array of meme objects.
    async getSearchedMemes(searchTerm) {
        try {
            const response = await fetch(searchURL + encodeURIComponent(searchTerm));
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.templates;
        } catch (error) {
            console.error('Error fetching searched memes:', error);
            throw error;
        }
    }
}