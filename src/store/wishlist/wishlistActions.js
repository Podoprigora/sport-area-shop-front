import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WishlistService from '@services/WishlistService';
import useEventCallback from '@ui/hooks/useEventCallback';
import { wishlistSelectedSelector } from './wishlistSelectors';

export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const RECEIVE_INITIAL_WISHLIST = 'RECEIVE_INITIAL_WISHLIST';
export const RECEIVE_WISHLIST = 'RECEIVE_WISHLIST';
export const CHANGE_WISHLIST_SORT = 'CHANGE_WISHLIST_SORT';
export const SELECT_WISHLIST_ITEM = 'SELECT_WISHLIST_ITEM';
export const SELECT_ALL_WISHLIST_ITEMS = 'SELECT_ALL_WISHLIST_ITEMS';
export const DELETE_WISHLIST_SELECTED_ITEMS = 'DELETE_WISHLIST_SELECTED_ITEMS';

export default function useWishlistActions() {
    const dispatch = useDispatch();
    const selected = useSelector(wishlistSelectedSelector);

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

    const onAsyncFetchWishlist = useEventCallback(() => {
        return WishlistService.fetchAll().then((response) => {
            dispatch({ type: RECEIVE_WISHLIST, payload: { items: response } });
        });
    });

    const onChangeWishlistSort = useEventCallback((value) => {
        dispatch({ type: CHANGE_WISHLIST_SORT, payload: { value } });
    });

    const onSelectWishlistItem = useEventCallback((id) => {
        dispatch({ type: SELECT_WISHLIST_ITEM, payload: { id } });
    });

    const onSelectAllWishlistItems = useEventCallback((toggle = true) => {
        dispatch({ type: SELECT_ALL_WISHLIST_ITEMS, payload: { toggle } });
    });

    const onAsyncDeletedWishlistSelectedItems = useCallback(() => {
        return WishlistService.delete(selected).then(() => {
            dispatch({ type: DELETE_WISHLIST_SELECTED_ITEMS });
        });
    }, [selected, dispatch]);

    return useMemo(
        () => ({
            onAsyncAddToWishlist,
            onAsyncFetchWishlist,
            onAsyncFetchInitialWishlist,
            onChangeWishlistSort,
            onSelectWishlistItem,
            onSelectAllWishlistItems,
            onAsyncDeletedWishlistSelectedItems
        }),
        [
            onAsyncAddToWishlist,
            onAsyncFetchInitialWishlist,
            onAsyncFetchWishlist,
            onAsyncDeletedWishlistSelectedItems,
            onChangeWishlistSort,
            onSelectWishlistItem,
            onSelectAllWishlistItems
        ]
    );
}
