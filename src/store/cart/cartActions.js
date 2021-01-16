import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import useEventCallback from '@ui/hooks/useEventCallback';
import { CartService } from '@services/CartService';
import { ADD_TO_CART, CHANGE_CART_ITEM, REMOVE_FROM_CART } from './cartReducer';

export function useCartActions() {
    const dispatch = useDispatch();

    const asyncAddToCart = useEventCallback((params) => {
        const { id } = params;
        return CartService.add(params).then((reponse) => {
            const { item = {}, success = true } = reponse || {};

            if (success) {
                if (!id) {
                    dispatch({ type: ADD_TO_CART, payload: item });
                } else {
                    dispatch({ type: REMOVE_FROM_CART, payload: { id } });
                }
            }
        });
    });

    const asyncGetAvailableQuantity = useEventCallback((params) => {
        const { id, qty } = params;

        if (!id || qty <= 0) {
            return undefined;
        }

        return CartService.getAvailableQuantity(params).then((response) => {
            const { item = {}, success = true, error } = response;

            if (success) {
                dispatch({ type: CHANGE_CART_ITEM, payload: item });
            } else if (error) {
                throw error;
            }
        });
    });

    return useMemo(
        () => ({
            asyncAddToCart,
            asyncGetAvailableQuantity
        }),
        [asyncAddToCart, asyncGetAvailableQuantity]
    );
}
