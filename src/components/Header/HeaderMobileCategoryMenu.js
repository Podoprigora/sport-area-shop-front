import React, { useState, memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Button from '@ui/Button';
import Hidden from '@ui/Hidden';
import MenuIcon from '@svg-icons/material/MenuIcon';
import MobileCategoryMenu from '@components/MobileCategoryMenu';
import useEventCallback from '@ui/hooks/useEventCallback';

import { categoriesSelector } from '@store/categories';

const HeaderMobileCategoryMenu = (props) => {
    const [open, setOpen] = useState(false);

    const data = useSelector(categoriesSelector);

    const handleButtonClick = useEventCallback((ev) => {
        ev.preventDefault();

        setOpen(true);
    });

    const handleMenuClose = useEventCallback((ev) => {
        setOpen(false);
    });

    const handleItemClick = useEventCallback((ev, item) => {
        console.log(item);
    });

    return (
        <>
            <Hidden lgUp>
                <Button
                    primary
                    className="header__nav-btn header__nav-btn--mobile"
                    icon={MenuIcon}
                    size="large"
                    onTouchEnd={handleButtonClick}
                    onClick={handleButtonClick}
                />
            </Hidden>
            <MobileCategoryMenu
                open={open}
                data={data}
                // selectedId={16}
                onItemClick={handleItemClick}
                onClose={handleMenuClose}
            />
        </>
    );
};

export default HeaderMobileCategoryMenu;
