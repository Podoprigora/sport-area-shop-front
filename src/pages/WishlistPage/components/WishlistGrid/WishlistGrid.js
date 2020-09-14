import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import useEventCallback from '@ui/hooks/useEventCallback';
import { GridEmptyItem } from '@components/Grid';
import useScreenMask from '@contexts/ScreenMaskContext';
import { useWishlistActions, wishlistItemsSelector } from '@store/wishlist';
import WishlistGridItem from './WishlistGridItem';

const WishlistGrid = (props) => {
    const items = useSelector(wishlistItemsSelector);
    const { isMaskShown } = useScreenMask();
    const { onSelectWishlistItem } = useWishlistActions();

    const handleCheckChange = useEventCallback((ev, id) => {
        if (onSelectWishlistItem) {
            onSelectWishlistItem(id);
        }
    });

    const shouldDisplayItems = items && items.length > 0;

    return (
        <div className="catalog-grid catalog-grid--framed">
            {shouldDisplayItems && (
                <div className="catalog-grid__body">
                    {items.map((item, i) => {
                        const { id } = item;

                        return (
                            <WishlistGridItem
                                key={id}
                                {...item}
                                onCheckChange={handleCheckChange}
                            />
                        );
                    })}
                </div>
            )}
            {!shouldDisplayItems && !isMaskShown && (
                <GridEmptyItem>You Wish List is empty.</GridEmptyItem>
            )}
        </div>
    );
};

WishlistGrid.propTypes = {};

export default WishlistGrid;
