import React from 'react';
import PropTypes from 'prop-types';

import UserIcon from '@svg-icons/feather/UserIcon';
import HeartIcon from '@svg-icons/feather/HeartIcon';
import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';
import GridIcon from '@svg-icons/feather/GridIcon';

import Logo from '@resources/images/sport-area-logo.svg';
import Button from '@components/Button';
import PlusIcon from '@svg-icons/feather/PlusIcon';
import MenuIcon from '@svg-icons/feather/MenuIcon';

const Header = (props) => {
    return (
        <header className="header">
            <div className="header__top-part">
                <div className="container header__container">
                    <a href="#" className="header__logo-link">
                        <img src={Logo} alt="" className="header__logo-img" />
                    </a>
                </div>
            </div>
            <div className="header__nav-part">
                <div className="container header__container">
                    <Button size="medium" className="header__nav-btn">
                        <GridIcon className="btn__icon" />
                        Categories
                    </Button>
                    <Button
                        size="medium"
                        className="header__nav-btn"
                        style={{ marginLeft: '2rem' }}
                    >
                        <MenuIcon className="btn__icon" />
                        Categories
                    </Button>
                    <div className="header__search"> </div>
                    <div className="header__actions" style={{ marginLeft: 'auto' }}>
                        <div style={{ display: 'flex', color: '#669f42' }}>
                            <HeartIcon style={{ marginLeft: '2.4rem' }} />
                            <ShoppingCartIcon style={{ marginLeft: '2.4rem' }} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {};

export default Header;
