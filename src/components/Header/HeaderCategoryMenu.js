import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@ui/Button';
import MenuIcon from '@svg-icons/material/MenuIcon';
import CategoryMenu from '@components/CategoryMenu';
import useForkRef from '@ui/hooks/useForkRef';

import data from '@remote/json/categories.json';

const HeaderCategoryMenu = React.forwardRef(function HeaderCategoryMenu(props, ref) {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
    const handleRef = useForkRef(buttonRef, ref);

    const handleMenuButtonClick = useCallback((ev) => {
        setOpen(true);
    }, []);

    const handleMenuClose = useCallback((ev) => {
        setOpen(false);
    }, []);

    return (
        <>
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
            <CategoryMenu open={open} anchorRef={buttonRef} data={data} onClose={handleMenuClose} />
        </>
    );
});

HeaderCategoryMenu.propTypes = {};

export default HeaderCategoryMenu;
