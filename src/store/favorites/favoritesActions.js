import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import FavoritesService from '@services/FavoritesService';
import useEventCallback from '@ui/hooks/useEventCallback';

export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
export const RECEIVE_INITIAL_FAVORITES = 'RECEIVE_INITIAL_FAVORITES';
export const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES';
export const SELECT_FAVORITE = 'SELECT_FAVORITE';
export const REMOVE_SELECTED_FAVORITES = 'REMOVE_SELECTED_FAVORITES';

export default function useFavoritesActions() {
    const dispatch = useDispatch();

    const onAsyncAddToFavorite = useEventCallback((id) => {
        return FavoritesService.add(id).then(() => {
            dispatch({ type: ADD_TO_FAVORITE, payload: { id } });
        });
    });

    const onAsyncFetchInitialFavorites = useEventCallback(() => {
        return FavoritesService.fetchIds().then((response) => {
            dispatch({ type: RECEIVE_INITIAL_FAVORITES, payload: { ids: response } });
        });
    });

    const onAsyncFetchFavorites = () => {};

    const onSelelectFavorite = (id) => {};

    const onAsyncDeleteSelectedFavorites = () => {};

    return useMemo(
        () => ({
            onAsyncAddToFavorite,
            onAsyncFetchFavorites,
            onAsyncFetchInitialFavorites,
            onSelelectFavorite,
            onAsyncDeleteSelectedFavorites
        }),
        [onAsyncAddToFavorite, onAsyncFetchInitialFavorites]
    );
}
