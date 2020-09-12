import fakeRequest from './fakeRequest';

export default class FavoritesService {
    static async add(id) {
        return fakeRequest({ success: true, id }, { success: true, delay: 1000 });
    }
}
