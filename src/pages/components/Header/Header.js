import React from 'react';
import PropTypes from 'prop-types';

import HeartIcon from '@svg-icons/feather/HeartIcon';
import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';

import Link from '@components/Link';
import Logo from '@resources/images/sport-area-logo.svg';
import Button from '@components/Button';
import UserIcon from '@svg-icons/feather/UserIcon';
import LoginIcon from '@svg-icons/feather/LoginIcon';
import MenuIcon from '@svg-icons/material/MenuIcon';
import IconButton from '@components/IconButton';
import HeaderSearch from './HeaderSearch';

const Header = (props) => {
    return (
        <header className="header">
            <div className="header__top-part">
                <div className="container header__container">
                    <a href="#" className="header__logo-link">
                        <img src={Logo} alt="" className="header__logo-img" />
                    </a>
                    <div className="header__user-container">
                        <Link primary className="header__link" icon={LoginIcon} iconAlign="left">
                            Sign In
                        </Link>
                        <Link primary className="header__link">
                            Sing Up
                        </Link>
                    </div>
                </div>
            </div>
            <div className="header__nav-part">
                <div className="container header__container">
                    <Button primary className="header__nav-btn" icon={MenuIcon} size="large">
                        Shop by category
                    </Button>
                    <div className="header__search">
                        <HeaderSearch />
                    </div>
                    <div className="header__actions">
                        <IconButton primary size="large">
                            <HeartIcon />
                        </IconButton>
                        <IconButton primary size="large">
                            <ShoppingCartIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {};

export default Header;
