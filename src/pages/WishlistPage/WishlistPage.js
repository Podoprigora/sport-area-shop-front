import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import useScreenMask from '@contexts/ScreenMaskContext';
import { useWishlistActions, wishlistSortBySelector } from '@store/wishlist';
import WishlistPageView from './WishlistPageView';

const WishlistPage = (props) => {
    const sortBy = useSelector(wishlistSortBySelector);
    const { onAsyncFetchWishlist } = useWishlistActions();
    const { toggleMask } = useScreenMask();

    useEffect(() => {
        (async () => {
            try {
                toggleMask(true);
                await onAsyncFetchWishlist();
            } catch (e) {
                console.error(e);
            } finally {
                toggleMask(false);
            }
        })();
    }, [sortBy, onAsyncFetchWishlist, toggleMask]);

    return <WishlistPageView />;
};

export default WishlistPage;
