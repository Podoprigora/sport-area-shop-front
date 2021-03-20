import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useEventCallback, useMountedRef } from '@ui/utils';
import { useNotification } from '@ui/Notification';
import { Button } from '@ui/Button';
import { Hidden } from '@ui/Hidden';
import { CheckAllIcon, TrashIcon } from '@ui/svg-icons/feather';

import useScreenMask from '@contexts/ScreenMaskContext';
import {
    numOfWishlistItemsSelector,
    numOfWishlistSelectionSelector,
    useWishlistActions,
    wishlistSortBySelector
} from '@store/wishlist';

import WishlistSortByDropdown from './WishlistSortByDropdown';

const WisthlistTbar = () => {
    const sortBy = useSelector(wishlistSortBySelector);
    const numOfItems = useSelector(numOfWishlistItemsSelector);
    const numOfSelection = useSelector(numOfWishlistSelectionSelector);

    const {
        changeWishlistSort,
        selectAllWishlistItems,
        asyncDeleteWishlistSelectedItems
    } = useWishlistActions();

    const { showAlert } = useNotification();
    const { toggleMask } = useScreenMask();

    const isMoutedRef = useMountedRef();

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

    const handleDelete = useCallback(async () => {
        try {
            toggleMask(true);
            await asyncDeleteWishlistSelectedItems();
        } catch (e) {
            showAlert({
                type: 'error',
                frame: true,
                message: "We can't accomplish deleting, server error occurred!"
            });
        } finally {
            if (isMoutedRef.current) {
                toggleMask(false);
            }
        }
    }, [asyncDeleteWishlistSelectedItems, isMoutedRef, showAlert, toggleMask]);

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
                style={{ marginLeft: 'auto', minWidth: '18rem' }}
            />
        </div>
    );
};

export default memo(WisthlistTbar);
