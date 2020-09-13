import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import useMountedRef from '@ui/hooks/useMountedRef';
import { useCategoriesActions } from '@store/categories';
import { authSelector, useIdentityActions } from '@store/identity';
import { useFavoritesActions } from '@store/favorites';

import PagesView from './PagesView';

const Pages = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isAuth = useSelector(authSelector);

    const { onAsyncCategoriesFetch } = useCategoriesActions();
    const { onAsyncIdentityFetch } = useIdentityActions();
    const { onAsyncFetchInitialFavorites } = useFavoritesActions();

    const isMountedRef = useMountedRef();

    useEffect(() => {
        const promises = [onAsyncCategoriesFetch(true), onAsyncIdentityFetch(true)].map(
            (promise) => {
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
            }
        );

        (async () => {
            await Promise.all(promises);

            if (isMountedRef.current) {
                setLoading(false);
            }
        })();
    }, [isMountedRef, onAsyncCategoriesFetch, onAsyncIdentityFetch]);

    useEffect(() => {
        const fetchData = async () => {
            const promises = [onAsyncFetchInitialFavorites()];
            try {
                await Promise.all(promises);
            } catch (e) {
                console.error(e);
                setError(e);
            }
        };

        if (!isAuth) {
            return () => {
                fetchData();
            };
        }

        return undefined;
    }, [isAuth, onAsyncFetchInitialFavorites]);

    return <PagesView loading={loading} error={error} />;
};

export default Pages;
