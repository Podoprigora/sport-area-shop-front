import React, { memo } from 'react';
import PropTypes from 'prop-types';

import CatalogGridBody from './CatalogGridBody';
import CatalogGridTbar from './CatalogGridTbar';
import CatalogGridPagination from './CatalogGridPagination';

const CatalogGrid = (props) => {
    return (
        <div className="catalog-grid">
            <CatalogGridTbar />
            <CatalogGridBody />
            <CatalogGridPagination />
        </div>
    );
};

CatalogGrid.propTypes = {
    loading: PropTypes.bool
};

export default memo(CatalogGrid);
