import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@ui/IconButton';
import HeartIcon from '@svg-icons/feather/HeartIcon';
import Tooltip from '@ui/Tooltip';

const ProductTradeActionAddToWishlist = (props) => {
    return (
        <Tooltip title="Add to Wishlist">
            <IconButton
                size="large"
                className="product-trade__actions-item product-trade__actions-item--add-to-wishlist"
            >
                <HeartIcon />
            </IconButton>
        </Tooltip>
    );
};

ProductTradeActionAddToWishlist.propTypes = {};

export default ProductTradeActionAddToWishlist;
