import React from 'react';
import PropTypes from 'prop-types';

import ProductLink from './ProductLink';

const ProductSizes = (props) => {
    const { id: productId, items = [] } = props;

    if (!productId || items.lenght === 0) {
        return null;
    }

    return (
        <div className="product__sizes">
            <div className="product__sizes-label">Sizes:</div>
            <div className="product__sizes-body">
                {items.map((size, index) => {
                    const { id, name } = size;

                    if (!id || !name) {
                        return null;
                    }

                    return (
                        <ProductLink
                            key={id}
                            id={productId}
                            selectedSize={id}
                            className="product__size-link"
                        >
                            {name}
                        </ProductLink>
                    );
                })}
            </div>
        </div>
    );
};

ProductSizes.propTypes = {
    id: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })
    )
};

export default ProductSizes;
