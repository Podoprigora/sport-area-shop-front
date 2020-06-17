import React from 'react';
import PropTypes from 'prop-types';

import Logo from '@resources/images/sport-area-logo.svg';
import Button from '@ui/Button';
import MenuIcon from '@svg-icons/material/MenuIcon';
import HeaderSearch from './HeaderSearch';
import HeaderUserInfo from './HeaderUserInfo';
import HeaderActions from './HeaderActions';

const Header = (props) => {
    return (
        <header className="header">
            <div className="header__top-part">
                <div className="container header__container">
                    <a href="#" className="header__logo-link">
                        <img src={Logo} alt="" className="header__logo-img" />
                    </a>
                    <HeaderUserInfo />
                </div>
            </div>
            <div className="header__nav-part">
                <div className="container header__container">
                    <Button primary className="header__nav-btn" icon={MenuIcon} size="large">
                        Shop by category
                    </Button>
                    <HeaderSearch />
                    <HeaderActions />
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {};

export default Header;
