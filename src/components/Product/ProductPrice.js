import React from 'react';
import PropTypes from 'prop-types';
import Format from '@utils/Format';

const ProductPrice = (props) => {
    const { price, oldPrice, currency } = props;

    if (!price) {
        return null;
    }

    if (oldPrice) {
        return (
            <div className="product__prices-container">
                <div className="product__price product__price--old">
                    {Format.price(oldPrice, currency)}
                </div>
                <div className="product__price product__price--new">
                    {Format.price(price, currency)}
                </div>
            </div>
        );
    }

    return <div className="product__price">{Format.price(price, currency)}</div>;
};

ProductPrice.propTypes = {
    price: PropTypes.number,
    oldPrice: PropTypes.number,
    currency: PropTypes.string
};

export default ProductPrice;
