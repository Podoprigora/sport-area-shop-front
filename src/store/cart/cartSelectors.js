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
