import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@ui/Button';
import MenuIcon from '@svg-icons/material/MenuIcon';
import CategoryMenu from '@components/CategoryMenu';
import useForkRef from '@ui/hooks/useForkRef';

import data from '@remote/json/categories.json';
import Hidden from '@ui/Hidden';
import useEventCallback from '@ui/hooks/useEventCallback';

const HeaderCategoryMenu = React.forwardRef(function HeaderCategoryMenu(props, ref) {
    const [open, setOpen] = useState(false);
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
            {/* <Hidden mdDown> */}
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
            {/* </Hidden> */}
            <CategoryMenu
                open={open}
                anchorRef={buttonRef}
                data={data}
                maxGroupItemsLength={5}
                onClose={handleMenuClose}
                onItemClick={handleItemClick}
            />
        </>
    );
});

HeaderCategoryMenu.propTypes = {};

export default HeaderCategoryMenu;
