import favoritesIds from '@remote/json/product-favorites-ids';
import fakeRequest from './fakeRequest';

export default class FavoritesService {
    static async add(id) {
        return fakeRequest({ success: true, id }, { success: true, delay: 1000 });
    }

    static async fetchIds() {
        return fakeRequest(favoritesIds, { success: true, delay: 1000 });
    }
}
