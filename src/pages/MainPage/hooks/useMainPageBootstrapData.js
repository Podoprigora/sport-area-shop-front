import { useEffect, useState } from 'react';

import BrandsService from '@services/BrandsService';
import ProductsService from '@services/ProductsService';

export default function useMainPageBootstrapData() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        const promises = [
            BrandsService.fetchAdwSliders(),
            BrandsService.fetchAll(),
            ProductsService.fetchBrandnew(),
            ProductsService.fetchTopseller()
        ].map(async (pr) => pr.catch((e) => setError(e)));
        let isMounted = true;

        (async () => {
            setIsLoading(true);

            const [adwSlidersData, brandsData, brandnewData, topsellerData] = await Promise.all(
                promises
            );

            if (isMounted) {
                setData({
                    adwSlidersData,
                    brandsData,
                    brandnewData,
                    topsellerData
                });

                setIsLoading(false);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        isLoading,
        error,
        data
    };
}
