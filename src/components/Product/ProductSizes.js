import React from 'react';
import PropTypes from 'prop-types';
import ProductLink from './ProductLink';

const ProductSizes = (props) => {
    const { items = [] } = props;

    if (items.lenght === 0) {
        return null;
    }

    return (
        <div className="product__sizes">
            <div className="product__sizes-label">Sizes:</div>
            <div className="product__sizes-body">
                {items.map((size, index) => {
                    return (
                        <ProductLink key={index} className="product__size-link">
                            {size}
                        </ProductLink>
                    );
                })}
            </div>
        </div>
    );
};

ProductSizes.propTypes = {
    items: PropTypes.array
};

export default ProductSizes;
