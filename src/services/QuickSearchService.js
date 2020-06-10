import data from '@remote/json/quick-search.json';
import fakeRequest from './fakeRequest';

export default class QuickSearchService {
    static async fetch(query = '') {
        return fakeRequest(data, { success: true, delay: 500 });
    }
}
