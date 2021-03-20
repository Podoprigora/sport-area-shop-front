import React from 'react';
import { useSelector } from 'react-redux';

import { useEventCallback } from '@ui/utils';
import { Empty } from '@ui/Empty';

import useScreenMask from '@contexts/ScreenMaskContext';
import { useWishlistActions, wishlistItemsSelector } from '@store/wishlist';
import WishlistGridItem from './WishlistGridItem';

const WishlistGrid = () => {
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

export default WishlistGrid;
