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

    static exludeVat(price, vat) {
        if (!price || !vat) {
            return null;
        }

        const validVat = vat > 0 && vat < 1 ? vat : vat / 100;
        const result = (price / (1 + validVat)) * validVat;

        if (Number.isNaN(result)) {
            return null;
        }

        const roundedResult = Math.round(result * 100) / 100;

        return roundedResult;
    }
}
