import { useMemo } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

import useEventCallback from '@ui/hooks/useEventCallback';
import CartService from '@services/CartService';
import { ADD_TO_CART, REMOVE_FROM_CART } from './cartReducer';

export function useCartActions() {
    const dispatch = useDispatch();

    const asyncAddToCart = useEventCallback((params) => {
        const { cartId } = params;
        return CartService.add(params).then((reponse) => {
            const { item = {}, success = true } = reponse || {};

            if (success) {
                if (!cartId) {
                    dispatch({ type: ADD_TO_CART, payload: item });
                } else {
                    dispatch({ type: REMOVE_FROM_CART, payload: { id: cartId } });
                }
            }
        });
    });

    return useMemo(
        () => ({
            asyncAddToCart
        }),
        [asyncAddToCart]
    );
}
