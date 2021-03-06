import brandnewData from '@remote/json/brandnew';
import topsellerData from '@remote/json/topseller';
import productsData from '@remote/json/products';
import productFilters from '@remote/json/product-filters';
import product from '@remote/json/product';
import productComments from '@remote/json/product-comments';

import { suffleArray } from '@utils/convertingData';
import fakeRequest from './fakeRequest';

export default class ProductsService {
    static async fetchBrandnew(success = true) {
        if (success) {
            return fakeRequest(brandnewData, { success: true, delay: 1000 });
        }
        return fakeRequest('Some error occurred!', { success: false, delay: 2500 });
    }

    static async fetchTopseller(success = true) {
        if (success) {
            return fakeRequest(topsellerData, { success: true, delay: 2500 });
        }
        return fakeRequest('Some error occurred!', { success: false, delay: 2500 });
    }

    static async fetchAll(limit = 0, generateRandomId = true) {
        const items = await fakeRequest(productsData, { success: true, dalay: 1000 });

        const suffleItems = suffleArray(items);

        const itemsWithRandomIds =
            generateRandomId &&
            suffleItems.map(({ id, ...rest }) => {
                const randomId = Math.round(Math.random() * 10000000000);
                return { id: randomId, ...rest };
            });

        const resultItem = itemsWithRandomIds || suffleItems;

        return {
            items: limit ? resultItem.slice(0, limit) : resultItem,
            total: 240
        };
    }

    static async fetchFilters() {
        return fakeRequest(productFilters, { success: true, delay: 1500 });
    }

    static async fetchOne(id) {
        return fakeRequest(product, { success: true, delay: 1000 });
    }

    static async fetchProductComments({ productId, parentId = 0, limit = 10, start = 0 }) {
        const items = await fakeRequest(productComments, { success: true, delay: 600 });

        const filteredItems = items.filter((item) => item.parentId === parentId);

        const sortedItems = filteredItems.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        return sortedItems.slice(start, start + limit);
    }

    static async likeProductComment({ productId, commentId }) {
        return fakeRequest({ success: true }, { delay: 600, success: true });
    }

    static async addProductCommentReply(params) {
        const savedData = {
            id: new Date().getTime(),
            date: new Date().toLocaleDateString(),
            userId: 1,
            username: 'Demo Customer'
        };

        return fakeRequest({ ...params, ...savedData }, { success: true, dalay: 1000 });
    }

    static async saveProductComment(values) {
        const savedData = {
            id: new Date().getTime(),
            date: new Date().toLocaleDateString(),
            userId: 1,
            username: 'Demo Customer'
        };

        return fakeRequest({ success: true, ...savedData }, { success: true, delay: 1500 });
    }
}
