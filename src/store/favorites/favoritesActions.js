import FavoritesService from '@services/FavoritesService';
import useEventCallback from '@ui/hooks/useEventCallback';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

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

    const onAsyncFetchInitialFavorites = () => {};

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
        [onAsyncAddToFavorite]
    );
}
