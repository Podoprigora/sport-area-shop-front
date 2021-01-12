import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Logo from '../../assets/images/sport-area-logo.svg';
import HeaderSearch from './HeaderSearch';

import HeaderUser from './HeaderUser';
import HeaderCategoryMenu from './HeaderCategoryMenu';
import HeaderWishlistAction from './HeaderWishlistAction';
import HeaderCartAction from './HeaderCartAction';

const Header = (props) => {
    return (
        <header className="header">
            <div className="header__top-part">
                <div className="container header__container">
                    <a href="#" className="header__logo-link">
                        <img src={Logo} alt="" className="header__logo-img" />
                    </a>
                    <HeaderUser />
                </div>
            </div>
            <div className="header__nav-part">
                <div className="container header__container">
                    <HeaderCategoryMenu />
                    <HeaderSearch />
                    <div className="header__actions">
                        <HeaderWishlistAction />
                        <HeaderCartAction />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default memo(Header);
