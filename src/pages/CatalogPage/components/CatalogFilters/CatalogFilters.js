import React, { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import CatalogFiltersBrands from './CatalogFiltersBrands';
import CatalogFiltersSizes from './CatalogFiltersSizes';
import CatalogFiltersColors from './CatalogFiltersColors';
import CatalogFiltersPrice from './CatalogFiltersPrice';

const CatalogFilters = (props) => {
    return (
        <div className="catalog-page__filters">
            <CatalogFiltersBrands />
            <CatalogFiltersSizes />
            <CatalogFiltersPrice />
            <CatalogFiltersColors />
        </div>
    );
};

CatalogFilters.propTypes = {
    style: PropTypes.object
};

export default CatalogFilters;
