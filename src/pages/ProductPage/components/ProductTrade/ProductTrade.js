import React from 'react';
import PropTypes from 'prop-types';

import ProductTradeSizes from './ProductTradeSizes';
import ProductTradeActionAddToCart from './ProductTradeActionAddToCart';
import ProductTradeActionAddToWishlist from './ProductTradeActionAddToWishlist';
import ProductTradeDeliveryList from './ProductTradeDeliveryList';
import ProductTradeModelInfo from './ProductTradeModelInfo';
import ProductTradePrice from './ProductTradePrice';
import ProductTradeTitle from './ProductTradeTitle';

const ProductTrade = (props) => {
    return (
        <div className="product-trade product">
            <ProductTradeTitle className="product-trade__section" />
            <ProductTradePrice className="product-trade__section" />
            <ProductTradeSizes className="product-trade__section" />
            <ProductTradeModelInfo className="product-trade__section" />
            <div className="product-trade__section product-trade__actions">
                <ProductTradeActionAddToCart />
                <ProductTradeActionAddToWishlist />
            </div>
            <ProductTradeDeliveryList />
        </div>
    );
};

ProductTrade.propTypes = {
    className: PropTypes.string
};

export default ProductTrade;
