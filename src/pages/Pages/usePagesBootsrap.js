import { useEffect, useState } from 'react';

import { useCategoriesActions } from '@store/categories';
import { useIdentityActions } from '@store/identity';

import useMountedRef from '@ui/hooks/useMountedRef';

export default function usePagesBootsrap() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isMountedRef = useMountedRef();

    const { onAsyncCategoriesFetch } = useCategoriesActions();
    const { onAsyncIdentityFetch } = useIdentityActions();

    useEffect(() => {
        const promises = [onAsyncCategoriesFetch(true), onAsyncIdentityFetch(true)].map(
            (promise) => {
                let validPromise = promise;

                if (typeof promise === 'function') {
                    validPromise = promise();
                }

                if (validPromise instanceof Promise) {
                    return validPromise.catch((e) => {
                        setError(e);
                        console.error(e);
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

    return {
        loading,
        error
    };
}
