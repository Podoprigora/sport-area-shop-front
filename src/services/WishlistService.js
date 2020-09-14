import wishlistIds from '@remote/json/wishlist-ids';
import wishlist from '@remote/json/wishlist';

import fakeRequest from './fakeRequest';

export default class WishlistService {
    static async add(id) {
        return fakeRequest({ success: true, id }, { success: true, delay: 1000 });
    }

    static async fetchIds() {
        return fakeRequest(wishlistIds, { success: true, delay: 500 });
    }

    static async fetchAll() {
        return fakeRequest(wishlist, { success: true, delay: 250 });
    }

    static async delete(ids) {
        return fakeRequest({ success: true }, { success: true, delay: 2500 });
    }
}
