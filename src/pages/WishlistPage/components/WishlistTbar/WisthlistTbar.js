import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Button from '@ui/Button';
import TrashIcon from '@svg-icons/feather/TrashIcon';
import CheckAllIcon from '@svg-icons/feather/CheckAllIcon';
import Hidden from '@ui/Hidden';
import useEventCallback from '@ui/hooks/useEventCallback';

import useScreenMask from '@contexts/ScreenMaskContext';
import {
    numOfWishlistItemsSelector,
    numOfWishlistSelectionSelector,
    useWishlistActions,
    wishlistSortBySelector
} from '@store/wishlist';

import WishlistSortByDropdown from './WishlistSortByDropdown';

const WisthlistTbar = (props) => {
    const sortBy = useSelector(wishlistSortBySelector);
    const numOfItems = useSelector(numOfWishlistItemsSelector);
    const numOfSelection = useSelector(numOfWishlistSelectionSelector);

    const {
        changeWishlistSort,
        selectAllWishlistItems,
        asyncDeleteWishlistSelectedItems
    } = useWishlistActions();

    const { toggleMask } = useScreenMask();

    const handleSortByChange = useEventCallback((ev, value) => {
        if (changeWishlistSort) {
            changeWishlistSort(value);
        }
    });

    const handleToggleSelection = useCallback(() => {
        if (selectAllWishlistItems) {
            selectAllWishlistItems(numOfSelection !== numOfItems);
        }
    }, [numOfItems, numOfSelection, selectAllWishlistItems]);

    const handleDelete = useEventCallback(async () => {
        try {
            toggleMask(true);
            await asyncDeleteWishlistSelectedItems();
        } catch (e) {
            console.error(e);
        } finally {
            toggleMask(false);
        }
    });

    return (
        <div className="tbar tbar--sticky">
            <Hidden smDown>
                <Button
                    plain
                    centered
                    disabled={!numOfItems}
                    icon={CheckAllIcon}
                    onClick={handleToggleSelection}
                >
                    {numOfSelection && numOfSelection === numOfItems
                        ? 'Deselect All'
                        : 'Select All'}
                </Button>
            </Hidden>
            <Hidden smUp>
                <Button
                    plain
                    centered
                    disabled={!numOfItems}
                    icon={CheckAllIcon}
                    onClick={handleToggleSelection}
                />
            </Hidden>

            <Hidden smDown>
                <Button
                    plain
                    centered
                    disabled={!numOfSelection}
                    icon={TrashIcon}
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </Hidden>
            <Hidden smUp>
                <Button
                    plain
                    centered
                    disabled={!numOfSelection}
                    icon={TrashIcon}
                    onClick={handleDelete}
                />
            </Hidden>

            <WishlistSortByDropdown
                value={sortBy}
                disabled={!numOfItems}
                onChange={handleSortByChange}
                style={{ marginLeft: 'auto' }}
            />
        </div>
    );
};

export default memo(WisthlistTbar);
