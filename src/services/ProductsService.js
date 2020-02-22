import brandnewData from '@remote/json/brandnew.json';
import topsellerData from '@remote/json/topseller.json';

import fakeRequest from './fakeRequest';

export default class ProductsService {
    static async fetchBrandnew() {
        return fakeRequest(brandnewData, { success: true, delay: 1000 });
    }

    static async fetchTopseller() {
        return fakeRequest(topsellerData, { success: true, delay: 500 });
    }
}
