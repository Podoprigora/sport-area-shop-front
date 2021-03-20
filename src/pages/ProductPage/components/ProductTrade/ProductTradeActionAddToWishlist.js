import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { useMountedRef } from '@ui/utils';
import { IconButton } from '@ui/IconButton';
import { Tooltip } from '@ui/Tooltip';
import { CircularProgress } from '@ui/CircularProgress';
import { useWindowManager } from '@ui/WindowManager';
import { useNotification } from '@ui/Notification';
import { FavoriteOutlineIcon, FavoriteIcon } from '@ui/svg-icons/material';

import { useProductPageState } from '@pages/ProductPage/context';
import { makeIsProductAddedToWishlistSelector, useWishlistActions } from '@store/wishlist';
import { authSelector } from '@store/identity';

const ProductTradeActionAddToWishlist = () => {
    const [pending, setPending] = useState(false);
    const isMountedRef = useMountedRef();

    const { showAlert } = useNotification();

    const { id } = useProductPageState();
    const isAuth = useSelector(authSelector);

    const isProductAddedToWishlistSelector = useMemo(
        () => makeIsProductAddedToWishlistSelector(),
        []
    );
    const isProductAddedToWishlist = useSelector((state) =>
        isProductAddedToWishlistSelector(state, id)
    );

    const { asyncAddToWishlist } = useWishlistActions();
    const { openWindow } = useWindowManager();

    const handleClick = useCallback(async () => {
        if (!isAuth) {
            openWindow('LoginWindow');
            return;
        }

        if (asyncAddToWishlist) {
            try {
                setPending(true);
                await asyncAddToWishlist(id);
            } catch (e) {
                showAlert({
                    type: 'error',
                    frame: true,
                    message: 'Server error occurred, when add to wishlist!'
                });
            } finally {
                if (isMountedRef.current) {
                    setPending(false);
                }
            }
        }
    }, [asyncAddToWishlist, id, isAuth, isMountedRef, openWindow, showAlert]);

    return useMemo(() => {
        if (!id) {
            return null;
        }

        if (pending) {
            return (
                <CircularProgress
                    primary
                    size="medium"
                    className="product-trade__actions-item product-trade__actions-item--progress"
                />
            );
        }

        return (
            <Tooltip title={isProductAddedToWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}>
                <IconButton
                    size="large"
                    className="product-trade__actions-item product-trade__actions-item--add-to-wishlist"
                    onClick={handleClick}
                >
                    {isProductAddedToWishlist && isAuth ? (
                        <FavoriteIcon size="xlarge" />
                    ) : (
                        <FavoriteOutlineIcon size="xlarge" />
                    )}
                </IconButton>
            </Tooltip>
        );
    }, [id, pending, isProductAddedToWishlist, isAuth, handleClick]);
};

export default ProductTradeActionAddToWishlist;
