import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import useScreenMask from '@contexts/ScreenMaskContext';
import { useWishlistActions } from '@store/wishlist';
import WishlistPageView from './WishlistPageView';

const WishlistPage = (props) => {
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
    }, [onAsyncFetchWishlist, toggleMask]);

    return <WishlistPageView />;
};

export default WishlistPage;
