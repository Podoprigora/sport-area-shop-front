import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

import Button from '@ui/Button';
import Hidden from '@ui/Hidden';
import MenuIcon from '@svg-icons/material/MenuIcon';
import MobileCategoryMenu from '@components/MobileCategoryMenu';
import useEventCallback from '@ui/hooks/useEventCallback';
import { plainArrayToNestedArray, nestedArrayToPlainArray } from '@ui/utils/convertingData';

import categoriesData from '@remote/json/categories.json';

const HeaderMobileCategoryMenu = (props) => {
    const [open, setOpen] = useState(false);

    const handleButtonClick = useEventCallback((ev) => {
        setOpen(true);
    });

    const handleMenuClose = useEventCallback((ev) => {
        setOpen(false);
    });

    useEffect(() => {
        // const plainArray = nestedArrayToPlainArray(categoriesData);
        // console.log(JSON.stringify(plainArray));
        // const nestedArray = plainArrayToNestedArray(plainArray);
        // console.log(nestedArray);
    }, []);

    return (
        <>
            <Hidden lgUp>
                <Button
                    primary
                    className="header__nav-btn header__nav-btn--mobile"
                    icon={MenuIcon}
                    size="large"
                    onClick={handleButtonClick}
                />
            </Hidden>
            <MobileCategoryMenu open={open} onClose={handleMenuClose} />
        </>
    );
};

HeaderMobileCategoryMenu.propTypes = {};

export default HeaderMobileCategoryMenu;
