import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ProductTradePrice = (props) => {
    const { className } = props;

    return (
        <div className={classNames('product-trade__prices', className)}>
            <div className="product-trade__price  product__price product__price--new">€ 67.47</div>
            <div className="product-trade__price-discount">
                <div className="product-trade__discount">Save 10%</div>
                <div className="product__price product__price--old">€ 74.95</div>
            </div>
            <div className="product-trade__price-note">
                including VAT, plus shipping costs, if applicable
            </div>
        </div>
    );
};

ProductTradePrice.propTypes = {
    className: PropTypes.string
};

export default ProductTradePrice;
