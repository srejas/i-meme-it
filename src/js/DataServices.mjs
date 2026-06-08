const trendingURL = 'https://api.imgflip.com/get_memes';
const searchURL = 'https://justmeme.wtf/api/v1/templates/search?q=';

export default class DataServices {
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