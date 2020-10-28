import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@ui/IconButton';
import Tooltip from '@ui/Tooltip';
import { makeIsProductAddedToWishlistSelector, useWishlistActions } from '@store/wishlist';
import { useSelector } from 'react-redux';
import { authSelector } from '@store/identity';
import { useProductPageState } from '@pages/ProductPage/context';
import FavoriteOutlineIcon from '@svg-icons/material/FavoriteOutlineIcon';
import CircularProgress from '@ui/CircularProgress';
import useMountedRef from '@ui/hooks/useMountedRef';
import FavoriteIcon from '@svg-icons/material/FavoriteIcon';
import { useWindowManager } from '@ui/WindowManager';
import HeartIcon from '@svg-icons/feather/HeartIcon';

const ProductTradeActionAddToWishlist = (props) => {
    const [pending, setPending] = useState(false);
    const isMountedRef = useMountedRef();

    const { id } = useProductPageState();

    const isProductAddedToWishlistSelector = useMemo(
        () => makeIsProductAddedToWishlistSelector(),
        []
    );

    const isAuth = useSelector(authSelector);
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
                console.error(e);
            } finally {
                if (isMountedRef.current) {
                    setPending(false);
                }
            }
        }
    }, [asyncAddToWishlist, id, isAuth, isMountedRef, openWindow]);

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

ProductTradeActionAddToWishlist.propTypes = {};

export default ProductTradeActionAddToWishlist;
