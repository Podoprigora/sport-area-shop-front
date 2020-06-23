import React from 'react';
import PropTypes from 'prop-types';

import Logo from '@resources/images/sport-area-logo.svg';
import HeaderSearch from './HeaderSearch';
import HeaderActions from './HeaderActions';
import HeaderUser from './HeaderUser';
import HeaderCategoryMenu from './HeaderCategoryMenu';

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
                    <HeaderActions />
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {};

export default Header;
