import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import TopsellerCarouselWithFetchingDataOnDemand from '@components/TopsellerCarouselWithFetchingDataOnDemand';
import { makeSelectCategoryIdByPathSelector } from '@store/categories';

const CatalogTopseller = (props) => {
    const { pathname } = useLocation();

    const selectCategoryIdByPathSelector = useMemo(() => makeSelectCategoryIdByPathSelector(), []);

    const categoryId = useSelector((state) => selectCategoryIdByPathSelector(state, pathname));

    return <TopsellerCarouselWithFetchingDataOnDemand categoryId={categoryId} />;
};

export default CatalogTopseller;
