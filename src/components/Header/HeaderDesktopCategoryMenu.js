import React, { useState, useCallback, useRef, memo } from 'react';
import PropTypes from 'prop-types';

import Button from '@ui/Button';
import MenuIcon from '@svg-icons/material/MenuIcon';
import CategoryMenu from '@components/CategoryMenu';
import useForkRef from '@ui/hooks/useForkRef';

import Hidden from '@ui/Hidden';
import useEventCallback from '@ui/hooks/useEventCallback';
import { useCategoriesState, categoriesTreeSelector } from '@contexts/CategoriesContext';

const HeaderDesktopCategoryMenu = React.forwardRef(function HeaderDesktopCategoryMenu(props, ref) {
    const [open, setOpen] = useState(false);
    const { items } = useCategoriesState();
    const categoriesTree = categoriesTreeSelector(items);

    const buttonRef = useRef(null);
    const handleRef = useForkRef(buttonRef, ref);

    const handleMenuButtonClick = useEventCallback((ev) => {
        if (!open) {
            setOpen(true);
        }
    });

    const handleMenuClose = useCallback((ev) => {
        setOpen(false);
    }, []);

    const handleItemClick = useEventCallback((ev, item) => {
        console.log(item);
        handleMenuClose(ev);
    });

    return (
        <>
            <Hidden lgDown>
                <Button
                    primary
                    className="header__nav-btn"
                    icon={MenuIcon}
                    size="large"
                    ref={handleRef}
                    onClick={handleMenuButtonClick}
                >
                    Shop by category
                </Button>
            </Hidden>
            <CategoryMenu
                open={open}
                anchorRef={buttonRef}
                data={categoriesTree}
                maxGroupItemsLength={5}
                onClose={handleMenuClose}
                onItemClick={handleItemClick}
            />
        </>
    );
});

HeaderDesktopCategoryMenu.propTypes = {};

export default memo(HeaderDesktopCategoryMenu);
