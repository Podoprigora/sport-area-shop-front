import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import Button from '@ui/Button';
import MenuIcon from '@svg-icons/material/MenuIcon';
import CategoryMenu from '@components/CategoryMenu';

import Hidden from '@ui/Hidden';
import useEventCallback from '@ui/hooks/useEventCallback';
import { useCategoriesState, categoriesTreeSelector } from '@contexts/CategoriesContext';

const HeaderDesktopCategoryMenu = (props) => {
    const [open, setOpen] = useState(false);

    const { items } = useCategoriesState();
    const categoriesTree = categoriesTreeSelector(items);

    const buttonRef = useRef(null);

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
                    ref={buttonRef}
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
};

export default HeaderDesktopCategoryMenu;
