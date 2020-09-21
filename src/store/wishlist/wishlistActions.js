import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WishlistService from '@services/WishlistService';
import useEventCallback from '@ui/hooks/useEventCallback';
import { wishlistSelectedSelector } from './wishlistSelectors';

export const ADD_TO_WISHLIST = 'wishlist/ADD_TO_WISHLIST';
export const RECEIVE_INITIAL_WISHLIST = 'wishlist/RECEIVE_INITIAL_WISHLIST';
export const RECEIVE_WISHLIST = 'wishlist/RECEIVE_WISHLIST';
export const CHANGE_WISHLIST_SORT = 'wishlist/CHANGE_WISHLIST_SORT';
export const SELECT_WISHLIST_ITEM = 'wishlist/SELECT_WISHLIST_ITEM';
export const SELECT_ALL_WISHLIST_ITEMS = 'wishlist/SELECT_ALL_WISHLIST_ITEMS';
export const DELETE_WISHLIST_SELECTED_ITEMS = 'wishlist/DELETE_WISHLIST_SELECTED_ITEMS';

export default function useWishlistActions() {
    const dispatch = useDispatch();
    const selected = useSelector(wishlistSelectedSelector);

    const asyncAddToWishlist = useEventCallback((id) => {
        return WishlistService.add(id).then(() => {
            dispatch({ type: ADD_TO_WISHLIST, payload: { id } });
        });
    });

    const asyncFetchInitialWishlist = useEventCallback(() => {
        return WishlistService.fetchIds().then((response) => {
            dispatch({ type: RECEIVE_INITIAL_WISHLIST, payload: { ids: response } });
        });
    });

    const asyncFetchWishlist = useEventCallback(() => {
        return WishlistService.fetchAll().then((response) => {
            dispatch({ type: RECEIVE_WISHLIST, payload: { items: response } });
        });
    });

    const changeWishlistSort = useEventCallback((value) => {
        dispatch({ type: CHANGE_WISHLIST_SORT, payload: { value } });
    });

    const selectWishlistItem = useEventCallback((id) => {
        dispatch({ type: SELECT_WISHLIST_ITEM, payload: { id } });
    });

    const selectAllWishlistItems = useEventCallback((toggle = true) => {
        dispatch({ type: SELECT_ALL_WISHLIST_ITEMS, payload: { toggle } });
    });

    const asyncDeleteWishlistSelectedItems = useCallback(() => {
        return WishlistService.delete(selected).then(() => {
            dispatch({ type: DELETE_WISHLIST_SELECTED_ITEMS });
        });
    }, [selected, dispatch]);

    return useMemo(
        () => ({
            asyncAddToWishlist,
            asyncFetchWishlist,
            asyncFetchInitialWishlist,
            changeWishlistSort,
            selectWishlistItem,
            selectAllWishlistItems,
            asyncDeleteWishlistSelectedItems
        }),
        [
            asyncAddToWishlist,
            asyncFetchInitialWishlist,
            asyncFetchWishlist,
            asyncDeleteWishlistSelectedItems,
            changeWishlistSort,
            selectWishlistItem,
            selectAllWishlistItems
        ]
    );
}
