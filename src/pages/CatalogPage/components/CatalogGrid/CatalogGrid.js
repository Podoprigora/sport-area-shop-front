import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Pagination } from '@ui/Pagination';
import CatalogGridBody from './CatalogGridBody';
import CatalogGridTbar from './CatalogGridTbar';

const CatalogGrid = (props) => {
    return (
        <div className="catalog-grid">
            <CatalogGridTbar />
            <CatalogGridBody />
            <div className="catalog-grid__tbar">
                <Pagination />
            </div>
        </div>
    );
};

CatalogGrid.propTypes = {
    loading: PropTypes.bool
};

export default memo(CatalogGrid);
