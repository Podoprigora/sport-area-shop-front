import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { useMountedRef } from '@ui/utils';
import { useNotification } from '@ui/Notification';

import { cartItemsSelector, cartTotalsSelector, useCartActions } from '@store/cart';

import CartList from './CartList';
import CartSummary from './CartSummary';
import CartWindowView from './CartWindowView';

const CartWindow = () => {
    const cartItems = useSelector(cartItemsSelector);
    const cartTotals = useSelector(cartTotalsSelector);
    const { asyncAddToCart, asyncGetAvailableQuantity } = useCartActions();
    const { showAlert } = useNotification();

    const [loading, setLoading] = useState(false);
    const isMountedRef = useMountedRef();

    const handleItemChange = useCallback(
        async (ev, item) => {
            if (!asyncGetAvailableQuantity) {
                return;
            }

            try {
                setLoading(true);
                await asyncGetAvailableQuantity(item);
            } catch (e) {
                showAlert({
                    type: 'warning',
                    message: e,
                    autoClose: true,
                    autoCloseDelay: 5000,
                    frame: true
                });
            } finally {
                if (isMountedRef.current) {
                    setLoading(false);
                }
            }
        },
        [asyncGetAvailableQuantity, showAlert, isMountedRef]
    );

    const handleItemDelete = useCallback(
        async (ev, item) => {
            if (!asyncAddToCart) {
                return;
            }

            try {
                setLoading(true);
                await asyncAddToCart(item);
            } catch (e) {
                showAlert({
                    type: 'error',
                    message: "We can't delete item from cart, server error occurred!",
                    autoClose: true,
                    autoCloseDelay: 5000,
                    frame: true
                });
            } finally {
                if (isMountedRef.current) {
                    setLoading(false);
                }
            }
        },
        [asyncAddToCart, isMountedRef, showAlert]
    );

    const isCartEmpty = cartItems.length === 0;

    return useMemo(() => {
        return (
            <CartWindowView loading={loading} disableActions={isCartEmpty}>
                <CartList
                    items={cartItems}
                    onChange={handleItemChange}
                    onDelete={handleItemDelete}
                />
                <CartSummary {...cartTotals} />
            </CartWindowView>
        );
    }, [loading, isCartEmpty, cartItems, cartTotals, handleItemChange, handleItemDelete]);
};

export default CartWindow;
