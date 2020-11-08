import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useMountedRef from '@ui/hooks/useMountedRef';
import useNotification from '@ui/Notification';
import useScreenMask from '@contexts/ScreenMaskContext';
import { useWishlistActions, wishlistSortBySelector } from '@store/wishlist';
import WishlistPageView from './WishlistPageView';

const WishlistPage = () => {
    const sortBy = useSelector(wishlistSortBySelector);
    const { asyncFetchWishlist } = useWishlistActions();
    const { isMaskShown, toggleMask } = useScreenMask();
    const { showAlert } = useNotification();
    const isMountedRef = useMountedRef();

    useEffect(() => {
        (async () => {
            try {
                toggleMask(true);
                await asyncFetchWishlist();
            } catch (e) {
                showAlert({
                    type: 'error',
                    frame: true,
                    message: "We can't display data, server error occurred!"
                });
            } finally {
                if (isMountedRef.current) {
                    toggleMask(false);
                }
            }
        })();
    }, [sortBy, asyncFetchWishlist, toggleMask, isMountedRef, showAlert]);

    useEffect(() => {
        if (isMaskShown) {
            return () => {
                document.documentElement.scrollTo({ top: 0 });
            };
        }

        return undefined;
    }, [isMaskShown]);

    return <WishlistPageView />;
};

export default WishlistPage;
