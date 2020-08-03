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

    useEffect(() => {
        return () => {
            // https://reactrouter.com/web/guides/deep-redux-integration
            // https://github.com/ReactTraining/react-router/issues/6972
            // https://github.com/reduxjs/react-redux/issues/1510

            // Fix updating of useSelector in components that depend on selectedId and routeParams,
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
