import React, { useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectedCategoryIdSelector, useCategoriesActions } from '@store/categories';

import CatalogPageLayout from './CatalogPageLayout';

const CatalogPage = (props) => {
    const routeParams = useParams();
    const selectedId = useSelector(selectedCategoryIdSelector);
    const { onCategorySelect, onSelectedCategoryReset } = useCategoriesActions();

    useEffect(() => {
        if (!selectedId) {
            const path = Object.keys(routeParams).map((key) => routeParams[key]);

            onCategorySelect(null, path);
        }
    }, [routeParams, selectedId, onCategorySelect]);

    useLayoutEffect(() => {
        return () => {
            // Fix useSelector updating,
            // when route location and redux state are changing at the same time.
            // TODO: Find the better solution
            setTimeout(() => {
                onSelectedCategoryReset();
            }, 0);
        };
    }, [onSelectedCategoryReset]);

    return <CatalogPageLayout />;
};

export default CatalogPage;
