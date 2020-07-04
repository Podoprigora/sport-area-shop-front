import React from 'react';
import PropTypes from 'prop-types';

import HeaderDesktopCategoryMenu from './HeaderDesktopCategoryMenu';
import HeaderMobileCategoryMenu from './HeaderMobileCategoryMenu';

const HeaderCategoryMenu = (props) => {
    return (
        <>
            <HeaderMobileCategoryMenu />
            <HeaderDesktopCategoryMenu />
        </>
    );
};

export default HeaderCategoryMenu;
