import React from 'react';
import PropTypes from 'prop-types';

import UserIcon from '@svg-icons/feather/UserIcon';
import HeartIcon from '@svg-icons/feather/HeartIcon';
import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';
import GridIcon from '@svg-icons/feather/GridIcon';

import Logo from '@resources/images/sport-area-logo.svg';
import Button from '@components/Button';
import PlusIcon from '@svg-icons/feather/PlusIcon';
import MenuIcon from '@svg-icons/material/MenuIcon';
import CreatemodeEditIcon from '@svg-icons/material/CreatemodeEditIcon';
import ViewListIcon from '@svg-icons/material/ViewListIcon';
import MapPinIcon from '@svg-icons/feather/MapPinIcon';
import ThumbUpIcon from '@svg-icons/material/ThumbUpIcon';
import PlaylistAddIcon from '@svg-icons/material/PlaylistAddIcon';
import GridViewIcon from '@svg-icons/material/GridViewIcon';
import IconButton from '@components/IconButton';
import Input from '@components/Input';
import HeaderSearchField from '../HeaderSarchField';

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
                    <Button primary className="header__nav-btn" icon={MenuIcon}>
                        Shop by category
                    </Button>
                    <div className="header__search">
                        <HeaderSearchField />
                    </div>
                    <div className="header__actions">
                        <IconButton>
                            <HeartIcon />
                        </IconButton>
                        <IconButton>
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
