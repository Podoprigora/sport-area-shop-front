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
                        <GridViewIcon className="btn__icon" />
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
                    <Button size="small" className="header__nav-btn" style={{ marginLeft: '2rem' }}>
                        <CreatemodeEditIcon size="medium" className="btn__icon" />
                        Categories
                    </Button>
                    <Button size="small" className="header__nav-btn" style={{ marginLeft: '2rem' }}>
                        <ViewListIcon size="small" className="btn__icon" />
                        View List
                    </Button>
                    <Button size="small" className="header__nav-btn" style={{ marginLeft: '2rem' }}>
                        <MapPinIcon size="small" className="btn__icon" />
                        View List
                    </Button>
                    <Button size="small" className="header__nav-btn" style={{ marginLeft: '2rem' }}>
                        <ThumbUpIcon size="small" className="btn__icon" />
                        View List
                    </Button>
                    <Button size="small" className="header__nav-btn" style={{ marginLeft: '2rem' }}>
                        <PlaylistAddIcon size="large" className="btn__icon" />
                        Playlist Add
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
