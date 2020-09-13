import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { wishlistItemsSelector } from '@store/wishlist';
import WishlistGridItem from './WishlistGridItem';

const WishlistGrid = (props) => {
    const items = useSelector(wishlistItemsSelector);

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="catalog-grid catalog-grid--framed">
            <div className="catalog-grid__body">
                {items.map((item, i) => {
                    const { id } = item;

                    return <WishlistGridItem key={id} {...item} />;
                })}
            </div>
        </div>
    );
};

WishlistGrid.propTypes = {};

export default WishlistGrid;
