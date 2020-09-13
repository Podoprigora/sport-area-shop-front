import wishlistIds from '@remote/json/wishlist-ids';
import fakeRequest from './fakeRequest';

export default class WishlistService {
    static async add(id) {
        return fakeRequest({ success: true, id }, { success: true, delay: 1000 });
    }

    static async fetchIds() {
        return fakeRequest(wishlistIds, { success: true, delay: 1000 });
    }
}
