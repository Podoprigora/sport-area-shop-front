import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import TopsellerCarouselWithFetchingDataOnDemand from '@components/TopsellerCarouselWithFetchingDataOnDemand';
import { useProductPageState } from '@pages/ProductPage/context';

const ProductTopseller = (props) => {
    const { categoryId } = useProductPageState();

    return useMemo(() => {
        if (!categoryId) {
            return null;
        }

        return <TopsellerCarouselWithFetchingDataOnDemand categoryId={categoryId} />;
    }, [categoryId]);
};

export default ProductTopseller;
