export default class Calc {
    static discountPersent(oldPrice, price) {
        if (!oldPrice || !price) {
            return null;
        }

        if (oldPrice > price) {
            return Math.round((1 - price / oldPrice) * 100);
        }

        return null;
    }
}
