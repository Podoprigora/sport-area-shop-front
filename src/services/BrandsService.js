import brandsData from '@remote/json/brands.json';
import adwData from '@remote/json/adw-slider.json';

import fakeRequest from './fakeRequest';

export default class BrandsService {
    static async fetchAll() {
        return fakeRequest(brandsData, { success: true, delay: 300 });
    }

    static async fetchAdwSliders() {
        return fakeRequest(adwData, { success: true, delay: 500 });
    }
}
