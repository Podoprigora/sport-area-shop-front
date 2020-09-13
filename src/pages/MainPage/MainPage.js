import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useMountedRef from '@ui/hooks/useMountedRef';
import BrandsService from '@services/BrandsService';
import ProductsService from '@services/ProductsService';

import MainPageView from './MainPageView';

const MainPage = (props) => {
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

    const { adwSlidersData, brandsData, brandnewData, topsellerData } = data;

    return (
        <MainPageView
            loading={loading}
            adwSlidersData={adwSlidersData}
            brandsData={brandsData}
            brandnewData={brandnewData}
            topsellerData={topsellerData}
        />
    );
};

export default MainPage;
