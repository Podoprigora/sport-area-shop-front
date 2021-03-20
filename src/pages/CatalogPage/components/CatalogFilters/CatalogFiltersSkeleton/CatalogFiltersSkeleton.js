import React, { memo } from 'react';

import FiltersPanelSkeleton from '@components/Skeletons/FiltersPanelSkeleton';

const CatalogFiltersSkeleton = () => {
    return (
        <>
            <FiltersPanelSkeleton className="catalog-page-filters-panel" size={10} />
            <FiltersPanelSkeleton className="catalog-page-filters-panel" size={6} />
            <FiltersPanelSkeleton className="catalog-page-filters-panel" size={10} />
        </>
    );
};

CatalogFiltersSkeleton.propTypes = {};

export default memo(CatalogFiltersSkeleton);
