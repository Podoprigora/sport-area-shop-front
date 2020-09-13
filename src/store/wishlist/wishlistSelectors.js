import { createSelector } from 'reselect';

const getWishlist = (state) => {
    return state.wishlist;
};

const getWishlistAllIds = (wishlistState) => {
    return wishlistState.allIds || [];
};

const getWishlistItem = (wishlistState, id) => {
    return wishlistState.byId[id];
};

export const numOfWishlistItemsSelector = createSelector(getWishlist, (wishlistState) => {
    return getWishlistAllIds(wishlistState).length;
});

export const wishlistItemsSelector = createSelector(getWishlist, (wishlistState) => {
    const allIds = getWishlistAllIds(wishlistState);

    return allIds.reduce((result, id) => {
        const item = getWishlistItem(wishlistState, id) || null;

        if (item) {
            return [...result, item];
        }

        return result;
    }, []);
});

export const makeIsProductAddedToWishlistSelector = () =>
    createSelector(
        getWishlist,
        (_, id) => id,
        (wishlistState, id) => {
            return getWishlistAllIds(wishlistState).indexOf(id) !== -1;
        }
    );
