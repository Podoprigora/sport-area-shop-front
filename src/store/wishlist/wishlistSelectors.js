import { createSelector } from 'reselect';

export const getWishlist = (state) => {
    return state.wishlist;
};

export const getWishlistAllIds = (wishlistState) => {
    return wishlistState.allIds || [];
};

export const numOfWishlistItemsSelector = createSelector(
    (state) => getWishlist(state),
    (wishlistState) => {
        return getWishlistAllIds(wishlistState).length;
    }
);

export const makeIsProductAddedToWishlistSelector = () =>
    createSelector(
        (state) => getWishlist(state),
        (_, id) => id,
        (wishlistState, id) => {
            return getWishlistAllIds(wishlistState).indexOf(id) !== -1;
        }
    );
