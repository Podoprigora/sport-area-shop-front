import React from 'react';
import PropTypes from 'prop-types';

import ProductSkeleton from './ProductSkeleton';

const CatalogGridItemsSkeleton = (props) => {
    const { size = 16 } = props;

    return [...Array(size)].map((_, index) => {
        return (
            <ProductSkeleton
                key={index}
                className="catalog-grid__item catalog-grid__item--skeleton"
            />
        );
    });
};

CatalogGridItemsSkeleton.propTypes = {
    size: PropTypes.number
};

export default CatalogGridItemsSkeleton;
