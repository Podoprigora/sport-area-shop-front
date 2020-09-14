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

const getWishlistSortBy = (wishlistState) => wishlistState.sortBy;

const getWishlistSelected = (wishlistState) => wishlistState.selected;

export const numOfWishlistItemsSelector = createSelector(getWishlist, (wishlistState) => {
    return getWishlistAllIds(wishlistState).length;
});

export const numOfWishlistSelectionSelector = createSelector(getWishlist, (wishlistState) => {
    const selected = getWishlistSelected(wishlistState) || [];
    return selected.length;
});

export const wishlistSelectedSelector = createSelector(getWishlist, getWishlistSelected);

export const wishlistItemsSelector = createSelector(getWishlist, (wishlistState) => {
    const allIds = getWishlistAllIds(wishlistState);
    const selectedIds = getWishlistSelected(wishlistState);

    return allIds.reduce((result, id) => {
        const item = getWishlistItem(wishlistState, id) || null;
        const selected = selectedIds.indexOf(id) !== -1;

        if (item) {
            return [...result, { ...item, checked: selected }];
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

export const wishlistSortBySelector = createSelector(getWishlist, getWishlistSortBy);
