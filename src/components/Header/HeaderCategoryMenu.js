import React from 'react';

import HeaderDesktopCategoryMenu from './HeaderDesktopCategoryMenu';
import HeaderMobileCategoryMenu from './HeaderMobileCategoryMenu';

const HeaderCategoryMenu = () => {
    return (
        <>
            <HeaderMobileCategoryMenu />
            <HeaderDesktopCategoryMenu />
        </>
    );
};

export default HeaderCategoryMenu;
