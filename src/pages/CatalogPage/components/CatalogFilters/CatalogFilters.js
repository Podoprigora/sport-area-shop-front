import React, { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';

import {
    useCatalogPageState,
    useCatalogPageSelectors,
    useCatalogPageActions
} from '@pages/CatalogPage/context';

import CatalogFiltersSkeleton from './CatalogFiltersSkeleton';
import getCatalogFiltersComponentById from './getCatalogFiltersComponentById';

const CatalogFilters = (props) => {
    const catalogPageState = useCatalogPageState();
    const { initialLoading, filtersItems, getSelectedFiltersById } = useCatalogPageSelectors(
        catalogPageState
    );

    const { changeFilters } = useCatalogPageActions();

    const handleChange = useEventCallback((id, selected) => {
        changeFilters({ [id]: selected });
    }, []);

    if (!filtersItems) {
        return null;
    }

    const items = filtersItems.map((item) => {
        const { id } = item;
        const Component = getCatalogFiltersComponentById(id);
        const selected = getSelectedFiltersById(id);

        if (!Component) {
            return null;
        }

        return <Component key={id} {...item} selected={selected} onChange={handleChange} />;
    });

    return (
        <div className="catalog-page__filters">
            {initialLoading ? <CatalogFiltersSkeleton /> : items}
        </div>
    );
};

CatalogFilters.propTypes = {
    style: PropTypes.object
};

export default CatalogFilters;
