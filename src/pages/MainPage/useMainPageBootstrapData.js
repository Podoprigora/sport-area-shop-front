import { useEffect, useState } from 'react';

import useMountedRef from '@ui/hooks/useMountedRef';
import BrandsService from '@services/BrandsService';
import ProductsService from '@services/ProductsService';

export default function useMainPageBootstrapData() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const isMountedRef = useMountedRef();

    useEffect(() => {
        const promises = [
            BrandsService.fetchAdwSliders(),
            BrandsService.fetchAll(),
            ProductsService.fetchBrandnew(),
            ProductsService.fetchTopseller()
        ].map(async (pr) => pr.catch((e) => setError(e)));

        (async () => {
            const [adwSlidersData, brandsData, brandnewData, topsellerData] = await Promise.all(
                promises
            );

            if (isMountedRef.current) {
                setData({
                    adwSlidersData,
                    brandsData,
                    brandnewData,
                    topsellerData
                });

                setLoading(false);
            }
        })();
    }, [isMountedRef]);

    return {
        loading,
        error,
        data
    };
}
