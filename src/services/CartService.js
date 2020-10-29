import productData from '@remote/json/product';
import fakeRequest from './fakeRequest';

export default class CartService {
    static async add({ id, productId, sizeId }) {
        const cartId = id || new Date().getTime();

        const { name, brand, sizes = [], price, currency, thumbnails = [] } = productData || {};

        const sizeItem = sizes ? sizes.find((item) => item.id === sizeId) : {};
        const image = thumbnails[0];

        const savedData = {
            id: cartId,
            ...(!id
                ? { productId, sizeId, size: sizeItem?.name, image, name, brand, price, currency }
                : {})
        };

        return fakeRequest({ success: true, item: savedData }, { success: true, delay: 500 });
    }
}
