import brandnewData from '@remote/json/brandnew.json';
import topsellerData from '@remote/json/topseller.json';
import productsData from '@remote/json/products.json';
import productFilters from '@remote/json/product-filters.json';

import { suffleArray } from '@utils/convertingData';
import fakeRequest from './fakeRequest';

export default class ProductsService {
    static async fetchBrandnew() {
        return fakeRequest(brandnewData, { success: true, delay: 1000 });
    }

    static async fetchTopseller() {
        return fakeRequest(topsellerData, { success: true, delay: 500 });
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
}
