export default class Format {
    static price(price, currency) {
        if (!price) {
            return null;
        }

        const value = Math.round(price * 100) / 100;
        let currencySign = '';

        switch (currency.toLowerCase()) {
            case 'eur':
                currencySign = '€';
                break;
            default:
        }

        return `${currencySign} ${value}`;
    }
}
