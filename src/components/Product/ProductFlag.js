import React from 'react';
import PropTypes from 'prop-types';

const ProductFlag = (props) => {
    const { discount, isNew } = props;

    if (discount) {
        return <div className="product__flag product__flag--hot">-{discount}%</div>;
    }

    if (isNew) {
        return <div className="product__flag product__flag--new">New</div>;
    }

    return null;
};

ProductFlag.propTypes = {
    discount: PropTypes.number,
    isNew: PropTypes.bool
};

export default ProductFlag;
