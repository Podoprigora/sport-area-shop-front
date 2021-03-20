import React, { useMemo } from 'react';

import TopsellerCarouselWithFetchingDataOnDemand from '@components/TopsellerCarouselWithFetchingDataOnDemand';
import { useProductPageState } from '@pages/ProductPage/context';

const ProductTopseller = () => {
    const { categoryId } = useProductPageState();

    return useMemo(() => {
        if (!categoryId) {
            return null;
        }

        return <TopsellerCarouselWithFetchingDataOnDemand categoryId={categoryId} />;
    }, [categoryId]);
};

export default ProductTopseller;
