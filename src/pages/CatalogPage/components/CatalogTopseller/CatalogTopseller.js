import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import TopsellerCarouselWithFetchingDataOnDemand from '@components/TopsellerCarouselWithFetchingDataOnDemand';
import { makeSelectCategoryIdByPathSelector } from '@store/categories';

const CatalogTopseller = () => {
    const { pathname } = useLocation();

    const selectCategoryIdByPathSelector = useMemo(() => makeSelectCategoryIdByPathSelector(), []);

    const categoryId = useSelector((state) => selectCategoryIdByPathSelector(state, pathname));

    return <TopsellerCarouselWithFetchingDataOnDemand categoryId={categoryId} />;
};

export default CatalogTopseller;
