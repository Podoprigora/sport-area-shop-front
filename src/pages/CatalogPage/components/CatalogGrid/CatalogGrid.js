import React, { memo } from 'react';
import PropTypes from 'prop-types';

import CatalogGridBody from './CatalogGridBody';
import CatalogGridTbar from './CatalogGridTbar';
import CatalogGridPagination from './CatalogGridPagination';
import CatalogGridLoadMore from './CatalogGridLoadMore';

const CatalogGrid = (props) => {
    return (
        <div className="catalog-grid">
            <CatalogGridTbar />
            <CatalogGridBody />
            <CatalogGridLoadMore />
            <CatalogGridPagination />
        </div>
    );
};

CatalogGrid.propTypes = {
    loading: PropTypes.bool
};

export default memo(CatalogGrid);
