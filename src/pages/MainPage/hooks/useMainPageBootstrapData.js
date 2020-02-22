import { useEffect, useState } from 'react';

import BrandsService from '@services/BrandsService';
import ProductsService from '@services/ProductsService';

export default function useMainPageBootstrapData() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        const adwSlidersPromise = BrandsService.fetchAdwSliders().catch((e) => {
            setError(e);
        });
        const brandsPromise = BrandsService.fetchAll().catch((e) => {
            setError(e);
        });
        const brandnewPromise = ProductsService.fetchBrandnew().catch((e) => {
            setError(e);
        });
        const topsellerPromise = ProductsService.fetchTopseller().catch((e) => {
            setError(e);
        });

        (async () => {
            setIsLoading(true);

            try {
                const [
                    brandsData,
                    adwSlidersData,
                    brandnewData,
                    topsellerData
                ] = await Promise.all([
                    brandsPromise,
                    adwSlidersPromise,
                    brandnewPromise,
                    topsellerPromise
                ]);
                setData({
                    adwSlidersData,
                    brandsData,
                    brandnewData,
                    topsellerData
                });
            } catch (e) {
                setError(e);
            }

            setIsLoading(false);
        })();
    }, []);

    return {
        isLoading,
        error,
        data
    };
}
