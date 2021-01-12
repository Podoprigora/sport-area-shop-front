import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import InboxIcon from '@ui/svg-icons/feather/InboxIcon';
import useEventCallback from '@ui/hooks/useEventCallback';
import Empty from '@ui/Empty';
import useScreenMask from '@contexts/ScreenMaskContext';
import { useWishlistActions, wishlistItemsSelector } from '@store/wishlist';
import WishlistGridItem from './WishlistGridItem';

const WishlistGrid = (props) => {
    const items = useSelector(wishlistItemsSelector);
    const { isMaskShown } = useScreenMask();
    const { selectWishlistItem } = useWishlistActions();

    const handleCheckChange = useEventCallback((ev, id) => {
        if (selectWishlistItem) {
            selectWishlistItem(id);
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
            {!shouldDisplayItems && !isMaskShown && <Empty>You Wish List is empty.</Empty>}
        </div>
    );
};

WishlistGrid.propTypes = {};

export default WishlistGrid;
