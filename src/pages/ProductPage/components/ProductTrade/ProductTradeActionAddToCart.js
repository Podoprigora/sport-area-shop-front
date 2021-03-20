import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { useMountedRef } from '@ui/utils';
import { CircularProgress } from '@ui/CircularProgress';
import { Button } from '@ui/Button';
import { ShoppingCartIcon, CheckCircleIcon } from '@ui/svg-icons/feather';

import { makeCartIdByProductSelector, useCartActions } from '@store/cart';
import { useProductPageActions, useProductPageState } from '@pages/ProductPage/context';
import { useNotification } from '@ui/Notification';

const ProductTradeActionAddToCart = () => {
    const { showAlert } = useNotification();
    const { selectedSizeId, id } = useProductPageState();
    const { setError } = useProductPageActions();

    const { asyncAddToCart } = useCartActions();
    const cartIdSelector = useMemo(
        () => makeCartIdByProductSelector({ productId: id, sizeId: selectedSizeId }),
        [id, selectedSizeId]
    );
    const cartId = useSelector(cartIdSelector);
    const isProductInCart = !!cartId;

    const [loading, setLoading] = useState(false);
    const isMoutedRef = useMountedRef();

    const handleClick = useCallback(async () => {
        if (!selectedSizeId) {
            setError('sizes', 'Please select an available size.');
            return;
        }

        if (asyncAddToCart) {
            try {
                setLoading(true);
                await asyncAddToCart({ id: cartId, productId: id, sizeId: selectedSizeId });
            } catch (e) {
                showAlert({
                    type: 'error',
                    frame: true,
                    message: 'Server error occurred, when add to cart!'
                });
            } finally {
                if (isMoutedRef.current) {
                    setLoading(false);
                }
            }
        }
    }, [id, selectedSizeId, cartId, isMoutedRef, asyncAddToCart, setError, showAlert]);

    return useMemo(() => {
        return (
            <Button
                primary
                plain={isProductInCart}
                size="large"
                truncate
                centered={!isProductInCart}
                icon={isProductInCart ? CheckCircleIcon : ShoppingCartIcon}
                loading={loading}
                loadingComponent={<CircularProgress />}
                disabled={loading}
                className={classNames(
                    'product-trade__actions-item product-trade__actions-item--add-to-cart',
                    {
                        'product-trade__actions-item--selected': isProductInCart
                    }
                )}
                onClick={handleClick}
            >
                {isProductInCart ? 'The item already in the cart' : 'Add to Cart'}
            </Button>
        );
    }, [handleClick, loading, isProductInCart]);
};

export default ProductTradeActionAddToCart;
