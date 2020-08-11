import brandnewData from '@remote/json/brandnew.json';
import topsellerData from '@remote/json/topseller.json';
import productsData from '@remote/json/products.json';

import { suffleArray } from '@utils/convertingData';
import fakeRequest from './fakeRequest';

export default class ProductsService {
    static async fetchBrandnew() {
        return fakeRequest(brandnewData, { success: true, delay: 1000 });
    }

    static async fetchTopseller() {
        return fakeRequest(topsellerData, { success: true, delay: 500 });
    }

    static async fetchAll(limit = 0) {
        const items = await fakeRequest(productsData, { success: true, dalay: 1000 });

        const suffleItems = suffleArray(items);

        const itemsWithRandomIds = suffleItems.map(({ id, ...rest }) => {
            const randomId = Math.round(Math.random() * 10000000000);
            return { id: randomId, ...rest };
        });

        return {
            items: limit ? itemsWithRandomIds.slice(0, limit) : itemsWithRandomIds,
            total: 240
        };
    }
}
