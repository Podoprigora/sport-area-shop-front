import React, { useState, memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Button from '@ui/Button';
import Hidden from '@ui/Hidden';
import MenuIcon from '@svg-icons/material/MenuIcon';
import MobileCategoryMenu from '@components/MobileCategoryMenu';
import useEventCallback from '@ui/hooks/useEventCallback';
import { useCategoriesState } from '@contexts/CategoriesContext';
import { categoriesWithHasItemsSelector } from '@contexts/CategoriesContext/CategoriesContextSelectors';

const HeaderMobileCategoryMenu = (props) => {
    const [open, setOpen] = useState(false);

    const { items } = useCategoriesState();
    const data = categoriesWithHasItemsSelector(items);

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
