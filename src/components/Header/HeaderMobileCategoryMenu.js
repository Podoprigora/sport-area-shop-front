import React from 'react';
import PropTypes from 'prop-types';

import Button from '@ui/Button';
import Hidden from '@ui/Hidden';
import MenuIcon from '@svg-icons/material/MenuIcon';

const HeaderMobileCategoryMenu = (props) => {
    return (
        <Hidden lgUp>
            <Button
                primary
                className="header__nav-btn header__nav-btn--mobile"
                icon={MenuIcon}
                size="large"
            />
        </Hidden>
    );
};

HeaderMobileCategoryMenu.propTypes = {};

export default HeaderMobileCategoryMenu;
