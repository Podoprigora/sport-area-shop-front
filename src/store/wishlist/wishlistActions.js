import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import WishlistService from '@services/WishlistService';
import useEventCallback from '@ui/hooks/useEventCallback';

export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const RECEIVE_INITIAL_WISHLIST = 'RECEIVE_INITIAL_WISHLIST';
export const RECEIVE_WISHLIST = 'RECEIVE_WISHLIST';
export const SELECT_WISHLIST_ITEM = 'SELECT_WISHLIST_ITEM';
export const DELETE_WISHLIST_ITEM = 'DELETE_WISHLIST_ITEM';

export default function useWishlistActions() {
    const dispatch = useDispatch();

    const onAsyncAddToWishlist = useEventCallback((id) => {
        return WishlistService.add(id).then(() => {
            dispatch({ type: ADD_TO_WISHLIST, payload: { id } });
        });
    });

    const onAsyncFetchInitialWishlist = useEventCallback(() => {
        return WishlistService.fetchIds().then((response) => {
            dispatch({ type: RECEIVE_INITIAL_WISHLIST, payload: { ids: response } });
        });
    });

    const onAsyncFetchWishlist = () => {};

    const onSelelectWishlistItem = (id) => {};

    const onAsyncDeleteSelectedWishlistItems = () => {};

    return useMemo(
        () => ({
            onAsyncAddToWishlist,
            onAsyncFetchWishlist,
            onAsyncFetchInitialWishlist,
            onSelelectWishlistItem,
            onAsyncDeleteSelectedWishlistItems
        }),
        [onAsyncAddToWishlist, onAsyncFetchInitialWishlist]
    );
}
