import React from 'react';
import PropTypes from 'prop-types';

const ProductTitle = (props) => {
    const { brand, name } = props;

    return (
        <h4 className="product__title">
            {brand && <span className="product__brand">{brand}</span>}
            <span className="product__name">{name}</span>
        </h4>
    );
};

ProductTitle.propTypes = {
    brand: PropTypes.string,
    name: PropTypes.string
};

export default ProductTitle;
