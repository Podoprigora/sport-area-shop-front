import data from '@remote/json/categories.json';
import fakeRequest from './fakeRequest';

export default class CategoriesService {
    static async fetchAll(success = true) {
        if (success) {
            return fakeRequest(data, { success, delay: 1000 });
        }
        return fakeRequest('Some Server Error!', { success: false, delay: 1000 });
    }
}
