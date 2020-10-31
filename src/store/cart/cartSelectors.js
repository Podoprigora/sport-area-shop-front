import { createSelector } from 'reselect';

const getCart = (state) => {
    return state?.cart;
};

const getCartAllIds = (cartState) => {
    return cartState?.allIds || [];
};

const getCartItemsById = (cartState) => {
    return cartState?.itemsById || {};
};

// Selectors

export const cartSelector = createSelector(getCart, (cartState) => cartState);

export const cartItemsSelector = createSelector(getCart, (cartState) => {
    const allIds = getCartAllIds(cartState);
    const itemsById = getCartItemsById(cartState);

    const items = allIds.reduce((result, id) => {
        const item = itemsById[id];

        if (item) {
            const { qty, price } = item;
            const newItem = { ...item, amount: qty * price };

            return [...result, newItem];
        }

        return result;
    }, []);

    return items;
});

export const cartTotalsSelector = createSelector(getCart, (cartState) => {
    const allIds = getCartAllIds(cartState);
    const itemsById = getCartItemsById(cartState);

    const totals = {
        qty: 0,
        price: 0,
        currency: null,
        vat: null
    };

    allIds.forEach((id) => {
        const item = itemsById[id];
        const { currency, qty = 1, price = 0, vat = 0 } = item;

        if (item) {
            totals.qty += qty;
            totals.price += qty * price;

            if (!totals.currency && currency) {
                totals.currency = currency;
            }

            if (!totals.vat && vat) {
                totals.vat = vat;
            }
        }
    });

    return totals;
});

export const numOfCartItemsSelector = createSelector(getCart, (cartState) => {
    const ids = getCartAllIds(cartState);

    return ids.length || 0;
});

export const makeCartIdByProductSelector = (productItem) => {
    return createSelector(getCart, (cartState) => {
        const { productId, sizeId } = productItem;

        const itemsById = getCartItemsById(cartState);
        const allIds = getCartAllIds(cartState);

        const cartId = allIds.reduce((result, id) => {
            const item = itemsById[id];

            if (item && item?.productId === productId && item?.sizeId === sizeId) {
                return item?.id;
            }

            return result;
        }, null);

        return cartId;
    });
};
