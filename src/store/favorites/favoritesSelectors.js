import { createSelector } from 'reselect';

export const getFavorites = (state) => {
    return state.favorites;
};

export const getFavoritesAllIds = (favoritesState) => {
    return favoritesState.allIds || [];
};

export const numOfFavoritesSelector = createSelector(
    (state) => getFavorites(state),
    (favoritesState) => {
        return getFavoritesAllIds(favoritesState).length;
    }
);

export const makeIsProductAddedToFavoriteSelector = () =>
    createSelector(
        (state) => getFavorites(state),
        (_, id) => id,
        (favoritesState, id) => {
            return getFavoritesAllIds(favoritesState).indexOf(id) !== -1;
        }
    );
