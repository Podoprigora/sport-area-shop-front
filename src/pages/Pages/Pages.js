import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import useMountedRef from '@ui/hooks/useMountedRef';
import { useCategoriesActions } from '@store/categories';
import { authSelector, useIdentityActions } from '@store/identity';
import { useWishlistActions } from '@store/wishlist';

import PagesView from './PagesView';

const Pages = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isAuth = useSelector(authSelector);

    const { asyncFetchCategories } = useCategoriesActions();
    const { asyncFetchIdentity } = useIdentityActions();
    const { asyncFetchInitialWishlist } = useWishlistActions();

    const isMountedRef = useMountedRef();
    const hadInitialFetchRecentlyRef = useRef(false);

    useEffect(() => {
        const promises = [
            asyncFetchCategories(true),
            asyncFetchIdentity(true),
            asyncFetchInitialWishlist
        ].map((promise) => {
            let validPromise = promise;

            if (typeof promise === 'function') {
                validPromise = promise();
            }

            if (validPromise instanceof Promise) {
                return validPromise.catch((e) => {
                    console.error(e);
                    setError(e);
                });
            }

            return null;
        });

        (async () => {
            hadInitialFetchRecentlyRef.current = true;
            await Promise.all(promises);

            if (isMountedRef.current) {
                setLoading(false);
            }
        })();
    }, [isMountedRef, asyncFetchCategories, asyncFetchInitialWishlist, asyncFetchIdentity]);

    useEffect(() => {
        const fetchData = async () => {
            const promises = [asyncFetchInitialWishlist()];
            try {
                await Promise.all(promises);
            } catch (e) {
                console.error(e);
                setError(e);
            }
        };

        if (!isAuth && !hadInitialFetchRecentlyRef.current) {
            return () => {
                fetchData();
            };
        }

        return undefined;
    }, [isAuth, asyncFetchInitialWishlist]);

    useEffect(() => {
        hadInitialFetchRecentlyRef.current = false;
    });

    return <PagesView loading={loading} error={error} />;
};

export default Pages;
