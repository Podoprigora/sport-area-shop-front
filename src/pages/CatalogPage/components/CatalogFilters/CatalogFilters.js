import React, { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';

import {
    useCatalogPageState,
    useCatalogPageSelectors,
    useCatalogPageActions
} from '@pages/CatalogPage/context';

import CatalogFiltersSkeleton from './CatalogFiltersSkeleton';
import CatalogFiltersBrandsPanel from './CatalogFiltersBrandsPanel';
import CatalogFiltersColorsPanel from './CatalogFiltersColorsPanel';
import CatalogFiltersSizesPanel from './CatalogFiltersSizes';
import CatalogFiltersPriceRangePanel from './CatalogFiltersPriceRangePanel';

const filterComponents = {
    brands: CatalogFiltersBrandsPanel,
    sizes: CatalogFiltersSizesPanel,
    colors: CatalogFiltersColorsPanel,
    price: CatalogFiltersPriceRangePanel
};

const CatalogFilters = (props) => {
    const catalogPageState = useCatalogPageState();
    const { initialLoading, filtersItems, getSelectedFiltersById } = useCatalogPageSelectors(
        catalogPageState
    );

    const { onChangeFilters } = useCatalogPageActions();

    const handleChange = useEventCallback((id, selected) => {
        onChangeFilters({ [id]: selected });
    }, []);

    if (!filtersItems) {
        return null;
    }

    const items = filtersItems.map((item) => {
        const { id } = item;
        const Component = filterComponents[id];
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
