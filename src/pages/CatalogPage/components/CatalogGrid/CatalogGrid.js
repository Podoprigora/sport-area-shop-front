import React, { memo } from 'react';
import PropTypes from 'prop-types';

import CatalogGridBody from './CatalogGridBody';
import CatalogGridTbar from './CatalogGridTbar';

const CatalogGrid = (props) => {
    return (
        <div className="catalog-grid">
            <CatalogGridTbar />
            <CatalogGridBody />
        </div>
    );
};

CatalogGrid.propTypes = {
    loading: PropTypes.bool
};

export default memo(CatalogGrid);
