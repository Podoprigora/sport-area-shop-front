import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { useWishlistActions, makeIsProductAddedToWishlistSelector } from '@store/wishlist';
import { authSelector } from '@store/identity';
import { useWindowManager } from '@ui/WindowManager';
import ProductActionAddToWishlistView from './ProductActionAddToWishlistView';

const ProductActionAddToWishlist = (props) => {
    const { id } = props;

    const isAuth = useSelector(authSelector);
    const { openWindow } = useWindowManager();

    const isProductAddedToWishlistSelector = useMemo(
        () => makeIsProductAddedToWishlistSelector(),
        []
    );
    const isProductAddedToWishlist = useSelector((store) => {
        return isProductAddedToWishlistSelector(store, id);
    });

    const { asyncAddToWishlist } = useWishlistActions();
    const [loading, setLoading] = useState(false);

    const handleClick = useCallback(async () => {
        try {
            if (!isAuth) {
                openWindow('LoginWindow');
                return;
            }

            setLoading(true);
            await asyncAddToWishlist(id);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [id, isAuth, asyncAddToWishlist, openWindow]);

    const selected = isAuth && isProductAddedToWishlist;

    return (
        <ProductActionAddToWishlistView
            loading={loading}
            selected={selected}
            onClick={handleClick}
        />
    );
};

ProductActionAddToWishlist.propTypes = {
    id: PropTypes.number.isRequired
};

export default memo(ProductActionAddToWishlist);
